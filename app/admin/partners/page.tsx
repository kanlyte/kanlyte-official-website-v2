"use client";

import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, ActiveBadge, OrderBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { usePartners, useDeletePartner } from "@/content-manager/hooks/usePartners";

const RESOURCE = "partners";

const COLUMNS: ResourceColumn[] = [
  { key: "order", label: "Order", render: (v) => <OrderBadge value={v} /> },
  { key: "name", label: "Name" },
  { key: "url", label: "Website", render: (v) => v ? <a href={v} target="_blank" rel="noreferrer" className="text-xs text-primary underline underline-offset-2">{v}</a> : <span className="text-muted-foreground">—</span> },
  { key: "isActive", label: "Status", render: (v) => <ActiveBadge value={v} /> },
];

export default function PartnersPage() {
  const { data = [], isLoading } = usePartners();
  const { mutate: deletePartner, isPending } = useDeletePartner();

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader title="Partners" description="Manage the partners slider on the homepage." resource={RESOURCE} />
      <ResourceTable resource={RESOURCE} data={data} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search partners..." />
      <DeleteModal resource={RESOURCE} onConfirm={deletePartner} isPending={isPending} />
    </div>
  );
}
