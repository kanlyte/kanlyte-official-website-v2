"use client";

import Link from "next/link";
import Image from "next/image";

import { APP_CONFIG } from "@/config/app-config";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";
import { cn } from "@/lib/utils";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { SidebarSupportCard } from "./sidebar-support-card";

export function AppSidebar({ open }: { open: boolean }) {
  return (
    <aside
      data-collapsible={open ? "none" : "icon"}
      className={cn(
        "group fixed inset-y-0 left-0 z-40 flex w-[calc(var(--spacing)*68)] flex-col border-r bg-sidebar/95 backdrop-blur-sm transition-all duration-300 shadow-lg",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20",
      )}
    >
      <div className="flex h-12 items-center border-b px-4 overflow-hidden group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
        <Link prefetch={false} href="/admin" className="flex items-center gap-3 transition-all duration-200 hover:opacity-80 hover:scale-[1.02] min-w-0">
          <div className="relative h-8 w-8 shrink-0 flex items-center justify-center group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10">
            <Image
              src="/logos/logo-transparent.png"
              alt="Kanlyte Logo"
              width={32}
              height={32}
              className="h-full w-full object-contain transition-transform duration-300 group-hover:rotate-[360deg]"
              priority
            />
          </div>
          <div className="flex flex-col justify-center min-w-0 group-data-[collapsible=icon]:hidden">
            <div className="text-sm font-bold leading-tight truncate">
              Kanlyte Uganda Limited
            </div>
            <div className="text-[10px] font-medium text-muted-foreground leading-tight truncate">
              Perfectly Digital
            </div>
          </div>
        </Link>
      </div>
      <div className="no-scrollbar flex-1 overflow-y-auto py-2 px-2">
        <NavMain items={sidebarItems} />
      </div>
      <div className="border-t p-2 bg-gradient-to-t from-primary/5 to-transparent border-t-primary/10">
        <SidebarSupportCard />
        <NavUser user={{ name: "Admin", email: "admin@kanlyte.com", avatar: "" }} />
      </div>
    </aside>
  );
}
