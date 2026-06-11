"use client";

import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, ActiveBadge, OrderBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { useTestimonials, useDeleteTestimonial } from "@/content-manager/hooks/useTestimonials";

const RESOURCE = "testimonials";

const COLUMNS: ResourceColumn[] = [
  { key: "order", label: "Order", render: (v) => <OrderBadge value={v} /> },
  { key: "name", label: "Name" },
  { key: "location", label: "Location", render: (v) => <span className="text-muted-foreground text-sm">{v}</span> },
  { key: "text", label: "Testimonial", render: (v) => <span className="line-clamp-1 max-w-xs text-sm text-muted-foreground">{v}</span> },
  { key: "isActive", label: "Status", render: (v) => <ActiveBadge value={v} /> },
];

export default function TestimonialsPage() {
  const { data = [], isLoading } = useTestimonials();
  const { mutate: deleteTestimonial, isPending } = useDeleteTestimonial();

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader title="Testimonials" description="Manage client testimonials on the about page." resource={RESOURCE} />
      <ResourceTable resource={RESOURCE} data={data} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search testimonials..." />
      <DeleteModal resource={RESOURCE} onConfirm={deleteTestimonial} isPending={isPending} />
    </div>
  );
}
