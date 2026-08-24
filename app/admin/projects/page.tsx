"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, ActiveBadge, OrderBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { ProjectModal } from "@/components/admin/projects/project-modal";
import { useProjects, useDeleteProject } from "@/content-manager/hooks/useProjects";

const RESOURCE = "projects";

const COLUMNS: ResourceColumn[] = [
  { key: "order", label: "Order", render: (v) => <OrderBadge value={v} /> },
  { key: "image", label: "Image", render: (v) => v ? <Image src={v} alt="" width={56} height={32} className="h-8 w-14 object-cover rounded" /> : <span className="text-muted-foreground text-xs">—</span> },
  { key: "title", label: "Title" },
  { key: "tags", label: "Tags", render: (v: string[]) => (
    <div className="flex flex-wrap gap-1">
      {v?.slice(0, 3).map((t) => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
      {v?.length > 3 && <Badge variant="outline" className="text-xs">+{v.length - 3}</Badge>}
    </div>
  )},
  { key: "isActive", label: "Status", render: (v) => <ActiveBadge value={v} /> },
];

export default function ProjectsPage() {
  const { data = [], isLoading } = useProjects();
  const { mutate: deleteProject, isPending } = useDeleteProject();

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader title="Projects" description="Manage the portfolio projects shown on the website." resource={RESOURCE} />
      <ResourceTable resource={RESOURCE} data={data} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search projects..." />
      <ProjectModal />
      <DeleteModal resource={RESOURCE} onConfirm={deleteProject} isPending={isPending} />
    </div>
  );
}
