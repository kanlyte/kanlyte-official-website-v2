"use client";

import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, OrderBadge, ActiveBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { SectorWeServeModal } from "@/components/admin/sectors-we-serve/sector-we-serve-modal";
import { useSectorsWeServe, useDeleteSectorWeServe } from "@/content-manager/hooks/useSectorsWeServe";

const RESOURCE = "sectors-we-serve";

const COLUMNS: ResourceColumn[] = [
  { key: "order", label: "Order", render: (v) => <OrderBadge value={v} /> },
  { key: "icon", label: "Icon" },
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
  { key: "isActive", label: "Active", render: (v) => <ActiveBadge value={v} /> },
];

export default function SectorsWeServePage() {
  const { data = [], isLoading } = useSectorsWeServe();
  const { mutate: deleteSector, isPending } = useDeleteSectorWeServe();

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader title="Sectors We Serve" description="Manage the sectors your company serves." resource={RESOURCE} />
      <ResourceTable resource={RESOURCE} data={data} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search sectors..." />
      <SectorWeServeModal />
      <DeleteModal resource={RESOURCE} onConfirm={deleteSector} isPending={isPending} />
    </div>
  );
}
