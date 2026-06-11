"use client";

import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, ActiveBadge, OrderBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { useServices, useDeleteService } from "@/content-manager/hooks/useServices";

const RESOURCE = "services";

const COLUMNS: ResourceColumn[] = [
  { key: "order", label: "Order", render: (v) => <OrderBadge value={v} /> },
  { key: "title", label: "Title" },
  { key: "icon", label: "Icon" },
  { key: "description", label: "Description", render: (v) => <span className="line-clamp-1 max-w-xs text-sm text-muted-foreground">{v}</span> },
  { key: "isActive", label: "Status", render: (v) => <ActiveBadge value={v} /> },
];

export default function ServicesPage() {
  const { data = [], isLoading } = useServices();
  const { mutate: deleteService, isPending } = useDeleteService();

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader title="Services" description="Manage the services displayed on the homepage." resource={RESOURCE} />
      <ResourceTable resource={RESOURCE} data={data} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search services..." />
      <DeleteModal resource={RESOURCE} onConfirm={deleteService} isPending={isPending} />
    </div>
  );
}
