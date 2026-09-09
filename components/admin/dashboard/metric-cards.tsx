"use client";

import { FolderKanban, MessageSquare, Users, Layers3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useProjects } from "@/content-manager/hooks/useProjects";
import { useTeamMembers } from "@/content-manager/hooks/useTeamMembers";
import { useContactSubmissions } from "@/content-manager/hooks/useContactSubmissions";
import { useServices } from "@/content-manager/hooks/useServices";

export function DashboardMetricCards() {
  const { data: projects = [] } = useProjects();
  const { data: team = [] } = useTeamMembers();
  const { data: submissions = [] } = useContactSubmissions();
  const { data: services = [] } = useServices();

  const pending = submissions.filter((item: { status: string }) => item.status === "pending").length;
  const cards = [
    {
      icon: FolderKanban,
      label: "Projects",
      value: projects.length,
      detail: `${projects.filter((item: { isActive: boolean }) => item.isActive).length} published`,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      icon: Layers3,
      label: "Services",
      value: services.length,
      detail: `${services.filter((item: { isActive: boolean }) => item.isActive).length} active`,
      color: "bg-[#6EBE45]/10 text-[#5a9e3a]",
    },
    {
      icon: Users,
      label: "Team members",
      value: team.length,
      detail: `${team.filter((item: { featured: boolean }) => item.featured).length} featured`,
      color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    },
    {
      icon: MessageSquare,
      label: "Enquiries",
      value: submissions.length,
      detail: pending > 0 ? `${pending} need attention` : "All handled",
      color: pending > 0 ? "bg-amber-500/10 text-amber-600" : "bg-emerald-500/10 text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className="gap-0 overflow-hidden border-border/70 py-0 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5 md:p-6">
            <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${card.color}`}>
              <card.icon className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-muted-foreground md:text-sm">{card.label}</p>
              <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
                <span className="text-2xl font-bold tabular-nums tracking-tight md:text-3xl">{card.value}</span>
                <span className="text-[11px] text-muted-foreground md:text-xs">{card.detail}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
