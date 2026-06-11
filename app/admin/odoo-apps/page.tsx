"use client";

import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, ActiveBadge, OrderBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { useOdooApps, useDeleteOdooApp } from "@/content-manager/hooks/useOdooApps";

const RESOURCE = "odoo-apps";

const COLUMNS: ResourceColumn[] = [
  { key: "order", label: "Order", render: (v) => <OrderBadge value={v} /> },
  { key: "name", label: "Name" },
  { key: "icon", label: "Icon Path", render: (v) => <span className="font-mono text-xs text-muted-foreground">{v}</span> },
  { key: "isActive", label: "Status", render: (v) => <ActiveBadge value={v} /> },
];

export default function OdooAppsPage() {
  const { data = [], isLoading } = useOdooApps();
  const { mutate: deleteApp, isPending } = useDeleteOdooApp();

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader title="Odoo Apps" description="Manage the Odoo apps grid shown on the Odoo page." resource={RESOURCE} />
      <ResourceTable resource={RESOURCE} data={data} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search apps..." />
      <DeleteModal resource={RESOURCE} onConfirm={deleteApp} isPending={isPending} />
    </div>
  );
}
