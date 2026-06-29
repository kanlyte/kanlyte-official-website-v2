"use client";

import { useState } from "react";
import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, ActiveBadge, OrderBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { PageCapabilityModal } from "@/components/admin/page-capabilities/page-capability-modal";
import { DynamicIcon } from "@/components/admin/shared/icon-picker";
import { useAllPageCapabilities, useDeletePageCapability } from "@/content-manager/hooks/usePageCapabilities";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RESOURCE = "page-capabilities";

const PAGE_SLUGS = [
  { value: "odoo", label: "Odoo ERP" },
  { value: "school-sync", label: "School Sync" },
  { value: "lyte", label: "Lyte App" },
  { value: "research-innovation", label: "Research & Innovation" },
  { value: "web-cloud", label: "Web & Cloud Services" },
  { value: "software-development", label: "Software Development" },
  { value: "ict-training", label: "ICT Training & Consultancy" },
  { value: "email-hosting", label: "Email Hosting (standalone)" },
  { value: "app-development", label: "App Development (standalone)" },
];

const COLUMNS: ResourceColumn[] = [
  { key: "order", label: "Order", render: (v) => <OrderBadge value={v} /> },
  { key: "slug", label: "Page Slug", render: (v) => <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{v}</code> },
  { key: "icon", label: "Icon", render: (v) => (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded bg-primary/10 flex items-center justify-center">
        <DynamicIcon name={v} className="w-4 h-4 text-primary" />
      </div>
      <span className="text-xs text-muted-foreground">{v}</span>
    </div>
  )},
  { key: "name", label: "Name" },
  { key: "isActive", label: "Status", render: (v) => <ActiveBadge value={v} /> },
];

export default function PageCapabilitiesAdminPage() {
  const { data = [], isLoading } = useAllPageCapabilities();
  const { mutate: deleteItem, isPending } = useDeletePageCapability();
  const [slugFilter, setSlugFilter] = useState("all");

  const filtered = slugFilter === "all" ? data : data.filter((r: { slug: string }) => r.slug === slugFilter);

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader title="Page Capabilities" description="Manage the icon grid for all product and service pages." resource={RESOURCE} />

      <div className="flex items-center gap-3">
        <Select value={slugFilter} onValueChange={setSlugFilter}>
          <SelectTrigger className="w-[220px] bg-slate-50 border-slate-200 h-8 text-sm">
            <SelectValue placeholder="Filter by page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Pages</SelectItem>
            {PAGE_SLUGS.map((p) => (
              <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {slugFilter !== "all" && (
          <span className="text-xs text-muted-foreground">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
        )}
      </div>

      <ResourceTable resource={RESOURCE} data={filtered} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search capabilities..." />
      <PageCapabilityModal />
      <DeleteModal resource={RESOURCE} onConfirm={deleteItem} isPending={isPending} />
    </div>
  );
}
