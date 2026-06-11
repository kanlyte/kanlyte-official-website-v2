import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  sidebarOpen: boolean;
  activeNav: string;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setActiveNav: (nav: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      activeNav: "",
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setActiveNav: (nav) => set({ activeNav: nav }),
    }),
    { name: "admin-ui" }
  )
);
