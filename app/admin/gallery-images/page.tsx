"use client";

import Image from "next/image";
import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, ActiveBadge, OrderBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { GalleryImageModal } from "@/components/admin/gallery-images/gallery-image-modal";
import { useGalleryImages, useDeleteGalleryImage } from "@/content-manager/hooks/useGalleryImages";

const RESOURCE = "gallery-images";

const COLUMNS: ResourceColumn[] = [
  { key: "order", label: "Order", render: (v) => <OrderBadge value={v} /> },
  { key: "image", label: "Image", render: (v) => v ? <Image src={v} alt="" width={56} height={32} className="h-8 w-14 object-cover rounded" /> : <span className="text-muted-foreground text-xs">—</span> },
  { key: "title", label: "Title" },
  { key: "category", label: "Category", render: (v) => v ? <span className="text-sm text-muted-foreground">{v}</span> : <span className="text-muted-foreground text-xs">—</span> },
  { key: "isActive", label: "Status", render: (v) => <ActiveBadge value={v} /> },
];

export default function GalleryImagesPage() {
  const { data = [], isLoading } = useGalleryImages();
  const { mutate: deleteImage, isPending } = useDeleteGalleryImage();

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader title="Gallery" description="Manage images shown on the public gallery page." resource={RESOURCE} />
      <ResourceTable resource={RESOURCE} data={data} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search gallery images..." />
      <GalleryImageModal />
      <DeleteModal resource={RESOURCE} onConfirm={deleteImage} isPending={isPending} />
    </div>
  );
}
