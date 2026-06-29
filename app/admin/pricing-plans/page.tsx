"use client";

import { Badge } from "@/components/ui/badge";
import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, ActiveBadge, OrderBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { PricingPlanModal } from "@/components/admin/pricing-plans/pricing-plan-modal";
import { usePricingPlans, useDeletePricingPlan } from "@/content-manager/hooks/usePricingPlans";

const RESOURCE = "pricing-plans";

const COLUMNS: ResourceColumn[] = [
  { key: "order", label: "Order", render: (v) => <OrderBadge value={v} /> },
  { key: "category", label: "Category", render: (v) => <Badge variant="outline" className="capitalize text-xs">{v}</Badge> },
  { key: "tier", label: "Tier", render: (v) => <span className="capitalize text-sm">{v}</span> },
  { key: "title", label: "Title" },
  { key: "priceUGX", label: "Price (UGX)", render: (v) => <span className="text-sm font-medium">{v}</span> },
  { key: "priceUSD", label: "Price (USD)", render: (v) => <span className="text-sm text-muted-foreground">{v ?? "—"}</span> },
  { key: "isPopular", label: "Popular", render: (v) => v ? <Badge className="text-xs">Popular</Badge> : <span className="text-muted-foreground text-xs">—</span> },
  { key: "isActive", label: "Status", render: (v) => <ActiveBadge value={v} /> },
];

export default function PricingPlansPage() {
  const { data = [], isLoading } = usePricingPlans();
  const { mutate: deletePlan, isPending } = useDeletePricingPlan();

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader title="Pricing Plans" description="Manage all pricing plans across service and product categories." resource={RESOURCE} />
      <ResourceTable resource={RESOURCE} data={data} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search plans..." />
      <PricingPlanModal />
      <DeleteModal resource={RESOURCE} onConfirm={deletePlan} isPending={isPending} />
    </div>
  );
}
