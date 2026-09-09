"use client";

import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, ActiveBadge, OrderBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { ServiceModal } from "@/components/admin/services/service-modal";
import { DynamicIcon } from "@/components/admin/shared/icon-picker";
import { useServices, useDeleteService } from "@/content-manager/hooks/useServices";

const RESOURCE = "services";

const COLUMNS: ResourceColumn[] = [
  { key: "order", label: "Order", render: (value) => <OrderBadge value={value} /> },
  { key: "icon", label: "Icon", render: (value) => (
    <div className="flex items-center gap-2">
      <div className="flex h-7 w-7 items-center justify-center rounded bg-primary/10">
        <DynamicIcon name={value} className="h-4 w-4 text-primary" />
      </div>
      <span className="text-xs text-muted-foreground">{value}</span>
    </div>
  ) },
  { key: "title", label: "Title" },
  { key: "kind", label: "Type", render: (value) => (
    <span className="text-xs capitalize text-muted-foreground">
      {value === "main" ? "Main service" : "Offering"}
    </span>
  ) },
  { key: "parent", label: "Parent", render: (value) => (
    <span className="text-xs text-muted-foreground">
      {(value as { title?: string } | null)?.title ?? "—"}
    </span>
  ) },
  { key: "slug", label: "Slug", render: (value) => <span className="text-xs text-muted-foreground">/services/{value}</span> },
  { key: "description", label: "Description", render: (value) => <span className="line-clamp-1 max-w-xs text-sm text-muted-foreground">{value}</span> },
  { key: "featured", label: "Featured", render: (value) => value ? <ActiveBadge value /> : <span className="text-xs text-muted-foreground">—</span> },
  { key: "isActive", label: "Status", render: (value) => <ActiveBadge value={value} /> },
];

export default function ServicesPage() {
  const { data = [], isLoading } = useServices();
  const { mutate: deleteService, isPending } = useDeleteService();

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader
        title="Services"
        description="Manage main services and the offerings that belong to them."
        resource={RESOURCE}
      />
      <ResourceTable resource={RESOURCE} data={data} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search services..." />
      <ServiceModal />
      <DeleteModal resource={RESOURCE} onConfirm={deleteService} isPending={isPending} />
    </div>
  );
}
