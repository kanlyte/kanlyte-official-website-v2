"use client";

import { DashboardMetricCards } from "@/components/admin/dashboard/metric-cards";
import { RecentSubmissions } from "@/components/admin/dashboard/recent-submissions";
import { QuickLinks } from "@/components/admin/dashboard/quick-links";

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-semibold text-xl">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Welcome to the Kanlyte content management dashboard.</p>
      </div>
      <DashboardMetricCards />
      <QuickLinks />
      <RecentSubmissions />
    </div>
  );
}
