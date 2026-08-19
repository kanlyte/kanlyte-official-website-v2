const GA_ID = "G-EZH96K0MW5";

// ── Performance: mark when client instrumentation starts (before hydration) ──
performance.mark("app-init");

const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry instanceof PerformanceNavigationTiming) {
      performance.mark("app-tti");
      performance.measure("time-to-interactive", "app-init", "app-tti");
    }
  }
});
observer.observe({ entryTypes: ["navigation"] });

// ── Error tracking: capture unhandled errors before React hydration ──
window.addEventListener("error", (event) => {
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", "exception", {
        description: event.message,
        fatal: false,
      });
    }
  } catch {}
});

window.addEventListener("unhandledrejection", (event) => {
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", "exception", {
        description: String(event.reason),
        fatal: false,
      });
    }
  } catch {}
});

// ── SPA navigation tracking: fires on every Next.js <Link> navigation ──
// GA only gets the initial pageview from the <Script> in layout.tsx.
// Every client-side route change must be sent manually.
export function onRouterTransitionStart(url: string) {
  try {
    if (typeof window.gtag === "function") {
      window.gtag("config", GA_ID, {
        page_path: url,
      });
    }
  } catch {}
}
