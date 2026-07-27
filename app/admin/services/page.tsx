"use client";

import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, ActiveBadge, OrderBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { ServiceModal } from "@/components/admin/services/service-modal";
import { DynamicIcon } from "@/components/admin/shared/icon-picker";
import { useServices, useDeleteService } from "@/content-manager/hooks/useServices";
import { CategoryManager } from "@/components/admin/shared/category-manager";

const RESOURCE = "services";

const COLUMNS: ResourceColumn[] = [
  { key: "order", label: "Order", render: (v) => <OrderBadge value={v} /> },
  { key: "icon", label: "Icon", render: (v) => (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded bg-primary/10 flex items-center justify-center">
        <DynamicIcon name={v} className="w-4 h-4 text-primary" />
      </div>
      <span className="text-xs text-muted-foreground">{v}</span>
    </div>
  )},
  { key: "title", label: "Title" },
  { key: "category", label: "Category", render: (v) => <span className="text-xs capitalize text-muted-foreground">{v ?? "—"}</span> },
  { key: "slug", label: "Slug", render: (v) => <span className="text-xs text-muted-foreground">/services/{v}</span> },
  { key: "description", label: "Description", render: (v) => <span className="line-clamp-1 max-w-xs text-sm text-muted-foreground">{v}</span> },
  { key: "featured", label: "Featured", render: (v) => v ? <ActiveBadge value={true} /> : <span className="text-xs text-muted-foreground">—</span> },
  { key: "isActive", label: "Status", render: (v) => <ActiveBadge value={v} /> },
];

export default function ServicesPage() {
  const { data = [], isLoading } = useServices();
  const { mutate: deleteService, isPending } = useDeleteService();

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader title="Services" description="Manage the services displayed on the homepage." resource={RESOURCE} />
      <CategoryManager kind="service" />
      <ResourceTable resource={RESOURCE} data={data} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search services..." />
      <ServiceModal />
      <DeleteModal resource={RESOURCE} onConfirm={deleteService} isPending={isPending} />
    </div>
  );
}
