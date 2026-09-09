"use client";

import { ResourceHeader } from "@/components/admin/resources/resource-header";
import {
  ResourceTable,
  ActiveBadge,
  OrderBadge,
  type ResourceColumn,
} from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { HeroSlideModal } from "@/components/admin/hero-slides/hero-slide-modal";
import {
  useHeroSlides,
  useDeleteHeroSlide,
} from "@/content-manager/hooks/useHeroSlides";

const RESOURCE = "hero-slides";

const COLUMNS: ResourceColumn[] = [
  { key: "order", label: "Order", render: (v) => <OrderBadge value={v} /> },
  { key: "title", label: "Title" },
  { key: "subtitle", label: "Subtitle" },
  { key: "buttonText", label: "Button" },
  { key: "isActive", label: "Status", render: (v) => <ActiveBadge value={v} /> },
];

export default function HeroSlidesPage() {
  const { data = [], isLoading } = useHeroSlides();
  const { mutate: deleteSlide, isPending } = useDeleteHeroSlide();

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader
        title="Hero Slides"
        description="Manage the homepage hero slider content."
        resource={RESOURCE}
      />
      <ResourceTable
        resource={RESOURCE}
        data={data}
        columns={COLUMNS}
        isLoading={isLoading}
        searchPlaceholder="Search slides..."
      />
      <HeroSlideModal />
      <DeleteModal
        resource={RESOURCE}
        onConfirm={deleteSlide}
        isPending={isPending}
      />
    </div>
  );
}
