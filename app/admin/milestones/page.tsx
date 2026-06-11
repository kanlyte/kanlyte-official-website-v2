"use client";

import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, OrderBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { useMilestones, useDeleteMilestone } from "@/content-manager/hooks/useMilestones";

const RESOURCE = "milestones";

const COLUMNS: ResourceColumn[] = [
  { key: "order", label: "Order", render: (v) => <OrderBadge value={v} /> },
  { key: "year", label: "Year", render: (v) => <span className="font-mono font-medium text-sm">{v}</span> },
  { key: "title", label: "Title" },
  { key: "description", label: "Description", render: (v) => <span className="line-clamp-1 max-w-xs text-sm text-muted-foreground">{v}</span> },
];

export default function MilestonesPage() {
  const { data = [], isLoading } = useMilestones();
  const { mutate: deleteMilestone, isPending } = useDeleteMilestone();

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader title="Milestones" description="Manage the company journey milestones." resource={RESOURCE} />
      <ResourceTable resource={RESOURCE} data={data} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search milestones..." />
      <DeleteModal resource={RESOURCE} onConfirm={deleteMilestone} isPending={isPending} />
    </div>
  );
}
