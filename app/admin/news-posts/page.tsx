"use client";

import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, ActiveBadge, OrderBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { NewsPostModal } from "@/components/admin/news-posts/news-post-modal";
import { useNewsPosts, useDeleteNewsPost } from "@/content-manager/hooks/useNewsPosts";
import { format } from "date-fns";

const RESOURCE = "news-posts";

const COLUMNS: ResourceColumn[] = [
  { key: "order", label: "Order", render: (v) => <OrderBadge value={v} /> },
  { key: "image", label: "Image", render: (v) => v ? <img src={v} alt="" className="h-8 w-14 object-cover rounded" /> : <span className="text-muted-foreground text-xs">—</span> },
  { key: "title", label: "Title", render: (v) => <span className="line-clamp-1 max-w-xs font-medium text-sm">{v}</span> },
  { key: "publishedAt", label: "Published", render: (v) => <span className="text-xs text-muted-foreground">{format(new Date(v), "dd MMM yyyy")}</span> },
  { key: "isActive", label: "Status", render: (v) => <ActiveBadge value={v} /> },
];

export default function NewsPostsPage() {
  const { data = [], isLoading } = useNewsPosts();
  const { mutate: deletePost, isPending } = useDeleteNewsPost();

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader title="News & Updates" description="Manage news posts shown on the website." resource={RESOURCE} />
      <ResourceTable resource={RESOURCE} data={data} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search news posts..." />
      <NewsPostModal />
      <DeleteModal resource={RESOURCE} onConfirm={deletePost} isPending={isPending} />
    </div>
  );
}
