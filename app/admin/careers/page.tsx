"use client";

import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, ActiveBadge, OrderBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { CareerModal } from "@/components/admin/careers/career-modal";
import { useCareers, useDeleteCareer } from "@/content-manager/hooks/useCareers";

const RESOURCE = "careers";

const COLUMNS: ResourceColumn[] = [
  { key: "order", label: "Order", render: (v) => <OrderBadge value={v} /> },
  { key: "title", label: "Title", render: (v) => <span className="font-medium text-sm">{v}</span> },
  { key: "department", label: "Department" },
  { key: "location", label: "Location", render: (v) => <span className="text-sm text-muted-foreground">{v}</span> },
  { key: "type", label: "Type" },
  { key: "isActive", label: "Status", render: (v) => <ActiveBadge value={v} /> },
];

export default function CareersPage() {
  const { data = [], isLoading } = useCareers();
  const { mutate: deleteCareer, isPending } = useDeleteCareer();

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader title="Careers" description="Manage open job listings shown on the careers page." resource={RESOURCE} />
      <ResourceTable resource={RESOURCE} data={data} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search job openings..." />
      <CareerModal />
      <DeleteModal resource={RESOURCE} onConfirm={deleteCareer} isPending={isPending} />
    </div>
  );
}
