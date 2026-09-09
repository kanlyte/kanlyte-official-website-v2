"use client";

import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, ActiveBadge, OrderBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { FAQModal } from "@/components/admin/faqs/faq-modal";
import { useFAQs, useDeleteFAQ } from "@/content-manager/hooks/useFAQs";

const RESOURCE = "faqs";

const COLUMNS: ResourceColumn[] = [
  { key: "order", label: "Order", render: (v) => <OrderBadge value={v} /> },
  { key: "question", label: "Question", render: (v) => <span className="line-clamp-1 max-w-sm font-medium text-sm">{v}</span> },
  { key: "answer", label: "Answer", render: (v) => <span className="line-clamp-1 max-w-xs text-sm text-muted-foreground">{v}</span> },
  { key: "isActive", label: "Status", render: (v) => <ActiveBadge value={v} /> },
];

export default function FAQsPage() {
  const { data = [], isLoading } = useFAQs();
  const { mutate: deleteFAQ, isPending } = useDeleteFAQ();

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader title="FAQs" description="Manage frequently asked questions shown on the website." resource={RESOURCE} />
      <ResourceTable resource={RESOURCE} data={data} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search FAQs..." />
      <FAQModal />
      <DeleteModal resource={RESOURCE} onConfirm={deleteFAQ} isPending={isPending} />
    </div>
  );
}
