"use client";

import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, ActiveBadge, OrderBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { SocialLinkModal } from "@/components/admin/social-links/social-link-modal";
import { useSocialLinks, useDeleteSocialLink } from "@/content-manager/hooks/useSocialLinks";

const RESOURCE = "social-links";

const COLUMNS: ResourceColumn[] = [
  { key: "order", label: "Order", render: (v) => <OrderBadge value={v} /> },
  { key: "platform", label: "Platform", render: (v, row) => (
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
      <span className="font-medium text-sm">{v}</span>
    </div>
  )},
  { key: "url", label: "URL", render: (v) => (
    <a href={v} target="_blank" rel="noreferrer" className="text-xs text-primary underline underline-offset-2 truncate max-w-[200px] block">{v}</a>
  )},
  { key: "color", label: "Color", render: (v) => (
    <div className="flex items-center gap-2">
      <span className="w-5 h-5 rounded border border-border" style={{ backgroundColor: v }} />
      <span className="text-xs font-mono text-muted-foreground">{v}</span>
    </div>
  )},
  { key: "isActive", label: "Status", render: (v) => <ActiveBadge value={v} /> },
];

export default function SocialLinksPage() {
  const { data = [], isLoading } = useSocialLinks();
  const { mutate: deleteLink, isPending } = useDeleteSocialLink();

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader title="Social Links" description="Manage social media links shown across the website." resource={RESOURCE} />
      <ResourceTable resource={RESOURCE} data={data} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search social links..." />
      <SocialLinkModal />
      <DeleteModal resource={RESOURCE} onConfirm={deleteLink} isPending={isPending} />
    </div>
  );
}
