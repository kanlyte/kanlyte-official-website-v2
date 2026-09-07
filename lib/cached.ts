/**
 * Per-process in-memory cache for repository reads.
 *
 * Deploys are built locally (no DB reachable from the build machine) and
 * uploaded as a static tarball, so pages can't be prerendered at build time
 * -- see app/(home)/layout.tsx. Without that, every page view re-runs every
 * database query from scratch. This is the runtime alternative: cache reads
 * for a few minutes and invalidate on writes, so repeat visits within that
 * window don't touch the database at all.
 *
 * Deliberately not Next's `unstable_cache` -- that still needs to execute
 * once to populate, and self-hosted cache-handler behavior across a fresh
 * process per deploy is harder to reason about than a plain Map.
 */

const TTL_MS = 5 * 60 * 1000;

type Entry = { value: unknown; expires: number };

const store = new Map<string, Entry>();

/** Drops every cached entry whose key starts with `prefix`. */
export function invalidate(prefix: string): void {
  for (const key of store.keys()) {
    if (key.startsWith(prefix)) store.delete(key);
  }
}

type AnyRepo = Record<string, (...args: never[]) => Promise<unknown>>;

/**
 * Wraps a repository object: methods named `find*` are cached (keyed by
 * resource + method + args) for TTL_MS; every other method (create/update/
 * delete/upsert/...) passes through and then invalidates this resource's
 * cache entries, since it just changed the data those reads return.
 */
export function withCache<T extends AnyRepo>(resource: string, repo: T): T {
  const wrapped = {} as T;

  for (const name of Object.keys(repo) as (keyof T & string)[]) {
    const fn = repo[name];

    if (name.startsWith("find")) {
      wrapped[name] = (async (...args: unknown[]) => {
        const key = `${resource}:${name}:${JSON.stringify(args)}`;
        const hit = store.get(key);
        if (hit && hit.expires > Date.now()) return hit.value;

        const value = await fn(...(args as never[]));
        store.set(key, { value, expires: Date.now() + TTL_MS });
        return value;
      }) as unknown as T[keyof T & string];
    } else {
      wrapped[name] = (async (...args: unknown[]) => {
        const value = await fn(...(args as never[]));
        invalidate(`${resource}:`);
        return value;
      }) as unknown as T[keyof T & string];
    }
  }

  return wrapped;
}
