"use client";

import type { ReactNode } from "react";
import { siGithub } from "simple-icons";
import Link from "next/link";

import { AppSidebar } from "@/components/admin/sidebar/app-sidebar";
import { SimpleIcon } from "@/components/simple-icon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AccountSwitcher } from "@/components/admin/sidebar/account-switcher";
import { LayoutControls } from "@/components/admin/sidebar/layout-controls";
import { SearchDialog } from "@/components/admin/sidebar/search-dialog";
import { ThemeSwitcher } from "@/components/admin/sidebar/theme-switcher";
import { useUIStore } from "@/store/ui.store";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

export function AdminLayout({ children }: { children: ReactNode }) {
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={toggleSidebar}>
    <div className="flex min-h-screen w-full">
      <AppSidebar open={sidebarOpen} />
      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300",
          sidebarOpen ? "lg:ml-[calc(var(--spacing)*68)]" : "lg:ml-20",
        )}
      >
        <header
          className={cn(
            "flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear",
            "sticky top-0 z-50 overflow-hidden bg-background/50 backdrop-blur-md",
          )}
        >
          <div className="flex w-full items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-1 lg:gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="-ml-1"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
              >
                <Menu className="size-4" />
              </Button>
              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
              />
              <SearchDialog />
            </div>
            <div className="flex items-center gap-2">
              {/* <LayoutControls /> */}
              <ThemeSwitcher />
              <AccountSwitcher />
            </div>
          </div>
        </header>
        <div className="h-full p-4 has-data-[content-padding=false]:p-0 md:p-6 md:has-data-[content-padding=false]:p-0">
          {children}
        </div>
      </div>
    </div>
    </SidebarProvider>
  );
}
