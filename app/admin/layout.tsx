import type { ReactNode } from "react";
import { AdminLayout } from "@/components/admin/layout";
import { PreferencesStoreProvider } from "@/store/preferences/preferences-provider";
import { PREFERENCE_DEFAULTS } from "@/lib/preferences/preferences-config";
import type { FontKey } from "@/lib/fonts/registry";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <PreferencesStoreProvider
      themeMode={PREFERENCE_DEFAULTS.theme_mode}
      themePreset={PREFERENCE_DEFAULTS.theme_preset}
      font={PREFERENCE_DEFAULTS.font as FontKey}
      contentLayout={PREFERENCE_DEFAULTS.content_layout}
      navbarStyle={PREFERENCE_DEFAULTS.navbar_style}
    >
      <AdminLayout>{children}</AdminLayout>
    </PreferencesStoreProvider>
  );
}
