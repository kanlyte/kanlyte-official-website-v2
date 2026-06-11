"use client";

import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, OrderBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { useProcessSteps, useDeleteProcessStep } from "@/content-manager/hooks/useProcessSteps";

const RESOURCE = "process-steps";

const COLUMNS: ResourceColumn[] = [
  { key: "order", label: "Order", render: (v) => <OrderBadge value={v} /> },
  { key: "step", label: "Step" },
  { key: "title", label: "Title" },
  { key: "icon", label: "Icon" },
  { key: "description", label: "Description", render: (v) => <span className="line-clamp-1 max-w-xs text-sm text-muted-foreground">{v}</span> },
];

export default function ProcessStepsPage() {
  const { data = [], isLoading } = useProcessSteps();
  const { mutate: deleteStep, isPending } = useDeleteProcessStep();

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader title="Process Steps" description="Manage the how-we-work process steps." resource={RESOURCE} />
      <ResourceTable resource={RESOURCE} data={data} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search steps..." />
      <DeleteModal resource={RESOURCE} onConfirm={deleteStep} isPending={isPending} />
    </div>
  );
}
