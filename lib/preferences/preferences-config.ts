import type { FontKey } from "@/lib/fonts/registry";
import type { ContentLayout, NavbarStyle, SidebarCollapsible, SidebarVariant } from "./layout";
import type { ThemeMode, ThemePreset } from "./theme";

export type PreferencePersistence = "none" | "client-cookie" | "server-cookie" | "localStorage";

export type PreferenceValueMap = {
  theme_mode: ThemeMode;
  theme_preset: ThemePreset;
  font: FontKey;
  content_layout: ContentLayout;
  navbar_style: NavbarStyle;
  sidebar_variant: SidebarVariant;
  sidebar_collapsible: SidebarCollapsible;
};

export type PreferenceKey = keyof PreferenceValueMap;

export const LAYOUT_CRITICAL_KEYS = ["sidebar_variant", "sidebar_collapsible"] as const;
export type LayoutCriticalKey = (typeof LAYOUT_CRITICAL_KEYS)[number];
export type NonCriticalKey = Exclude<PreferenceKey, LayoutCriticalKey>;

type LayoutCriticalPersistence = Exclude<PreferencePersistence, "localStorage">;
type PreferencePersistenceConfig = {
  [K in LayoutCriticalKey]: LayoutCriticalPersistence;
} & {
  [K in NonCriticalKey]: PreferencePersistence;
};

export const PREFERENCE_DEFAULTS: PreferenceValueMap = {
  theme_mode: "light",
  theme_preset: "default",
  font: "geist",
  content_layout: "centered",
  navbar_style: "sticky",
  sidebar_variant: "inset",
  sidebar_collapsible: "icon",
};

export const PREFERENCE_PERSISTENCE: PreferencePersistenceConfig = {
  theme_mode: "client-cookie",
  theme_preset: "client-cookie",
  font: "client-cookie",
  content_layout: "client-cookie",
  navbar_style: "client-cookie",
  sidebar_variant: "client-cookie",
  sidebar_collapsible: "client-cookie",
};
