"use client";

import { TrendingUp, FileText, Users, MessageSquare, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useProjects } from "@/content-manager/hooks/useProjects";
import { useTeamMembers } from "@/content-manager/hooks/useTeamMembers";
import { useContactSubmissions } from "@/content-manager/hooks/useContactSubmissions";
import { useServices } from "@/content-manager/hooks/useServices";

export function DashboardMetricCards() {
  const { data: projects = [] } = useProjects();
  const { data: team = [] } = useTeamMembers();
  const { data: submissions = [] } = useContactSubmissions();
  const { data: services = [] } = useServices();

  const pending = submissions.filter((s: any) => s.status === "pending").length;

  const cards = [
    {
      icon: Layers,
      label: "Total Projects",
      value: projects.length,
      badge: `${projects.filter((p: any) => p.isActive).length} active`,
      trend: "up",
      note: "Published on website",
    },
    {
      icon: FileText,
      label: "Services",
      value: services.length,
      badge: `${services.filter((s: any) => s.isActive).length} active`,
      trend: "up",
      note: "Visible to visitors",
    },
    {
      icon: Users,
      label: "Team Members",
      value: team.length,
      badge: `${team.filter((m: any) => m.featured).length} featured`,
      trend: "up",
      note: "On about page",
    },
    {
      icon: MessageSquare,
      label: "Contact Submissions",
      value: submissions.length,
      badge: `${pending} pending`,
      trend: pending > 0 ? "down" : "up",
      note: pending > 0 ? "Needs attention" : "All handled",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardHeader>
            <CardTitle>
              <div className="flex size-7 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                <card.icon className="size-4" />
              </div>
            </CardTitle>
            <CardDescription>{card.label}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <div className="font-medium text-3xl tabular-nums leading-none tracking-tight">{card.value}</div>
              <Badge variant={card.trend === "down" ? "destructive" : "default"}>
                <TrendingUp className="size-3" />
                {card.badge}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm">{card.note}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
