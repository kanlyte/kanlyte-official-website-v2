"use client";

import Link from "next/link";
import { Command } from "lucide-react";

import { APP_CONFIG } from "@/config/app-config";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";
import { cn } from "@/lib/utils";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { SidebarSupportCard } from "./sidebar-support-card";

export function AppSidebar({ open }: { open: boolean }) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-[calc(var(--spacing)*68)] flex-col border-r bg-sidebar transition-transform duration-300",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-12 items-center border-b px-4">
        <Link prefetch={false} href="/admin" className="flex items-center gap-2 font-semibold text-base">
          <Command className="size-5" />
          <span>{APP_CONFIG.name}</span>
        </Link>
      </div>
      <div className="no-scrollbar flex-1 overflow-y-auto py-2">
        <NavMain items={sidebarItems} />
      </div>
      <div className="border-t p-2">
        <SidebarSupportCard />
        <NavUser user={{ name: "Admin", email: "admin@kanlyte.com", avatar: "" }} />
      </div>
    </aside>
  );
}
