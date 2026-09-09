import { PREFERENCE_DEFAULTS, PREFERENCE_PERSISTENCE } from "@/lib/preferences/preferences-config";

export function ThemeBootScript() {
  const persistence = JSON.stringify({
    theme_mode: PREFERENCE_PERSISTENCE.theme_mode,
    theme_preset: PREFERENCE_PERSISTENCE.theme_preset,
    font: PREFERENCE_PERSISTENCE.font,
    content_layout: PREFERENCE_PERSISTENCE.content_layout,
    navbar_style: PREFERENCE_PERSISTENCE.navbar_style,
    sidebar_variant: PREFERENCE_PERSISTENCE.sidebar_variant,
    sidebar_collapsible: PREFERENCE_PERSISTENCE.sidebar_collapsible,
  });

  const defaults = JSON.stringify({
    theme_mode: PREFERENCE_DEFAULTS.theme_mode,
    theme_preset: PREFERENCE_DEFAULTS.theme_preset,
    font: PREFERENCE_DEFAULTS.font,
    content_layout: PREFERENCE_DEFAULTS.content_layout,
    navbar_style: PREFERENCE_DEFAULTS.navbar_style,
    sidebar_variant: PREFERENCE_DEFAULTS.sidebar_variant,
    sidebar_collapsible: PREFERENCE_DEFAULTS.sidebar_collapsible,
  });

  const code = `
    (function () {
      try {
        var root = document.documentElement;
        var PERSISTENCE = ${persistence};
        var DEFAULTS = ${defaults};

        function readCookie(name) {
          var match = document.cookie.split("; ").find(function(c) {
            return c.startsWith(name + "=");
          });
          return match ? decodeURIComponent(match.split("=")[1]) : null;
        }

        function readLocal(name) {
          try { return window.localStorage.getItem(name); } catch (e) { return null; }
        }

        function readPreference(key, fallback) {
          var mode = PERSISTENCE[key];
          var value = null;
          if (mode === "localStorage") value = readLocal(key);
          if (!value && (mode === "client-cookie" || mode === "server-cookie")) value = readCookie(key);
          if (!value || typeof value !== "string") return fallback;
          return value;
        }

        var rawMode = readPreference("theme_mode", DEFAULTS.theme_mode);
        var rawPreset = readPreference("theme_preset", DEFAULTS.theme_preset);
        var rawFont = readPreference("font", DEFAULTS.font);
        var rawContentLayout = readPreference("content_layout", DEFAULTS.content_layout);
        var rawNavbarStyle = readPreference("navbar_style", DEFAULTS.navbar_style);
        var rawSidebarVariant = readPreference("sidebar_variant", DEFAULTS.sidebar_variant);
        var rawSidebarCollapsible = readPreference("sidebar_collapsible", DEFAULTS.sidebar_collapsible);

        var isValidMode = rawMode === "dark" || rawMode === "light" || rawMode === "system";
        var mode = isValidMode ? rawMode : DEFAULTS.theme_mode;
        var resolvedMode = mode === "system" && window.matchMedia
          ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
          : mode;

        root.classList.toggle("dark", resolvedMode === "dark");
        root.setAttribute("data-theme-mode", mode);
        root.setAttribute("data-theme-preset", rawPreset || DEFAULTS.theme_preset);
        root.setAttribute("data-font", rawFont || DEFAULTS.font);
        root.setAttribute("data-content-layout", rawContentLayout || DEFAULTS.content_layout);
        root.setAttribute("data-navbar-style", rawNavbarStyle || DEFAULTS.navbar_style);
        root.setAttribute("data-sidebar-variant", rawSidebarVariant || DEFAULTS.sidebar_variant);
        root.setAttribute("data-sidebar-collapsible", rawSidebarCollapsible || DEFAULTS.sidebar_collapsible);
        root.style.colorScheme = resolvedMode === "dark" ? "dark" : "light";
      } catch (e) {
        console.warn("ThemeBootScript error:", e);
      }
    })();
  `;

  /* eslint-disable-next-line react/no-danger */
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
