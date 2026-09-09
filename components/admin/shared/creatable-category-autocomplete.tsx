"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Loader2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  useCreateResourceCategory,
  useResourceCategories,
} from "@/content-manager/hooks/useResourceCategories";
import type { ResourceCategoryKind } from "@/content-manager/dtos";
import { cn } from "@/lib/utils";

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface CreatableCategoryAutocompleteProps {
  kind: ResourceCategoryKind;
  value?: string | null;
  onChange: (slug: string) => void;
  placeholder?: string;
  optional?: boolean;
}

export function CreatableCategoryAutocomplete({
  kind,
  value = "",
  onChange,
  placeholder = "Search or add a category…",
  optional = false,
}: CreatableCategoryAutocompleteProps) {
  const { data: categories = [], isLoading } = useResourceCategories(kind);
  const { mutateAsync: createCategory, isPending } = useCreateResourceCategory(kind);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = categories.find((category) => category.slug === value);

  useEffect(() => {
    if (!open) setQuery(selected?.name ?? value ?? "");
  }, [open, selected?.name, value]);

  useEffect(() => {
    function closeWhenOutside(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", closeWhenOutside);
    return () => document.removeEventListener("mousedown", closeWhenOutside);
  }, []);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return categories;
    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(search) ||
        category.slug.includes(search),
    );
  }, [categories, query]);

  const newSlug = makeSlug(query);
  const exactMatch = categories.some(
    (category) =>
      category.slug === newSlug ||
      category.name.toLowerCase() === query.trim().toLowerCase(),
  );

  async function addCategory() {
    if (!newSlug || isPending) return;
    const category = await createCategory({ name: query.trim(), slug: newSlug });
    onChange(category.slug);
    setQuery(category.name);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative">
      <Input
        value={query}
        placeholder={placeholder}
        autoComplete="off"
        className="h-8 text-sm"
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          const next = event.target.value;
          setQuery(next);
          setOpen(true);
          if (optional && !next) onChange("");
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && open && newSlug && !exactMatch) {
            event.preventDefault();
            void addCategory();
          }
          if (event.key === "Escape") setOpen(false);
        }}
      />

      {open && (
        <div className="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          {(isLoading || isPending) && (
            <div className="flex items-center gap-2 px-2 py-2 text-xs text-muted-foreground">
              <Loader2 className="size-3 animate-spin" />
              {isPending ? "Adding category…" : "Loading categories…"}
            </div>
          )}

          {!isLoading &&
            filtered.map((category) => (
              <button
                key={category.id}
                type="button"
                className={cn(
                  "flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent",
                  value === category.slug && "bg-accent",
                )}
                onClick={() => {
                  onChange(category.slug);
                  setQuery(category.name);
                  setOpen(false);
                }}
              >
                <span>{category.name}</span>
                {value === category.slug && <Check className="size-4" />}
              </button>
            ))}

          {newSlug && !exactMatch && (
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm text-primary hover:bg-accent"
              onClick={() => void addCategory()}
            >
              <Plus className="size-4" />
              Add “{query.trim()}”
            </button>
          )}

          {!isLoading && !filtered.length && (!newSlug || exactMatch) && (
            <p className="px-2 py-2 text-xs text-muted-foreground">No categories found.</p>
          )}
        </div>
      )}
    </div>
  );
}
