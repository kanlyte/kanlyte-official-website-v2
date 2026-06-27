"use client";

import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, OrderBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { ProcessStepModal } from "@/components/admin/process-steps/process-step-modal";
import { DynamicIcon } from "@/components/admin/shared/icon-picker";
import { useProcessSteps, useDeleteProcessStep } from "@/content-manager/hooks/useProcessSteps";

const RESOURCE = "process-steps";

const COLUMNS: ResourceColumn[] = [
  { key: "order", label: "Order", render: (v) => <OrderBadge value={v} /> },
  { key: "step", label: "Step" },
  { key: "icon", label: "Icon", render: (v) => (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded bg-primary/10 flex items-center justify-center">
        <DynamicIcon name={v} className="w-4 h-4 text-primary" />
      </div>
      <span className="text-xs text-muted-foreground">{v}</span>
    </div>
  )},
  { key: "title", label: "Title" },
  { key: "description", label: "Description", render: (v) => <span className="line-clamp-1 max-w-xs text-sm text-muted-foreground">{v}</span> },
];

export default function ProcessStepsPage() {
  const { data = [], isLoading } = useProcessSteps();
  const { mutate: deleteStep, isPending } = useDeleteProcessStep();

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader title="Process Steps" description="Manage the how-we-work process steps." resource={RESOURCE} />
      <ResourceTable resource={RESOURCE} data={data} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search steps..." />
      <ProcessStepModal />
      <DeleteModal resource={RESOURCE} onConfirm={deleteStep} isPending={isPending} />
    </div>
  );
}
