"use client";

import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, OrderBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { useStats, useDeleteStat } from "@/content-manager/hooks/useStats";

const RESOURCE = "stats";

const COLUMNS: ResourceColumn[] = [
  { key: "order", label: "Order", render: (v) => <OrderBadge value={v} /> },
  { key: "label", label: "Label" },
  { key: "value", label: "Value" },
];

export default function StatsPage() {
  const { data = [], isLoading } = useStats();
  const { mutate: deleteStat, isPending } = useDeleteStat();

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader title="Stats" description="Manage the homepage stats section numbers." resource={RESOURCE} />
      <ResourceTable resource={RESOURCE} data={data} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search stats..." />
      <DeleteModal resource={RESOURCE} onConfirm={deleteStat} isPending={isPending} />
    </div>
  );
}
