"use client";

import { Badge } from "@/components/ui/badge";
import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, ActiveBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { PageContentModal } from "@/components/admin/page-content/page-content-modal";
import { usePageContents, useDeletePageContent } from "@/content-manager/hooks/usePageContent";

const RESOURCE = "page-content";

const COLUMNS: ResourceColumn[] = [
  { key: "slug", label: "Slug", render: (v) => <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{v}</code> },
  { key: "pageType", label: "Type", render: (v) => <Badge variant="outline" className="capitalize text-xs">{v}</Badge> },
  { key: "badge", label: "Badge", render: (v) => <span className="text-sm text-muted-foreground line-clamp-1 max-w-xs">{v}</span> },
  { key: "title", label: "Title", render: (v) => <span className="text-sm line-clamp-1 max-w-[180px]">{v}</span> },
  { key: "highlight", label: "Highlight" },
  { key: "isActive", label: "Status", render: (v) => <ActiveBadge value={v} /> },
];

export default function PageContentAdminPage() {
  const { data = [], isLoading } = usePageContents();
  const { mutate: deleteItem, isPending } = useDeletePageContent();

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader title="Page Content" description="Manage hero copy for all product and service pages." resource={RESOURCE} />
      <ResourceTable resource={RESOURCE} data={data} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search pages..." />
      <PageContentModal />
      <DeleteModal resource={RESOURCE} onConfirm={deleteItem} isPending={isPending} />
    </div>
  );
}
