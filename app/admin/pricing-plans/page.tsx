"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, ActiveBadge, OrderBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { PricingPlanModal } from "@/components/admin/pricing-plans/pricing-plan-modal";
import { usePricingPlans, useDeletePricingPlan, useTogglePricingEnabled } from "@/content-manager/hooks/usePricingPlans";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useResourceCategories } from "@/content-manager/hooks/useResourceCategories";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CategoryManager } from "@/components/admin/shared/category-manager";

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
  const { mutate: togglePricing } = useTogglePricingEnabled();
  const { data: categories = [] } = useResourceCategories("pricing-plan");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = categoryFilter === "all" ? data : data.filter((r: { category: string }) => r.category === categoryFilter);

  const selectedCategory = categories.find((c) => c.slug === categoryFilter);

  const productCats = categories.filter((c) => c.ownerType === "product");
  const serviceCats = categories.filter((c) => c.ownerType === "service");
  const standaloneCats = categories.filter((c) => c.ownerType === "standalone" || !c.ownerType);

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader title="Pricing Plans" description="Manage pricing plans. Categories link to products, services, or standalone packages (e.g. Go-Digital, cPanel)." resource={RESOURCE} />

      <CategoryManager kind="pricing-plan" />

      <div className="flex items-center gap-3">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[220px] bg-slate-50 border-slate-200 h-8 text-sm">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {productCats.length > 0 && (
              <>
                <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Products</div>
                {productCats.map((c) => <SelectItem key={c.id} value={c.slug}>{c.name}</SelectItem>)}
              </>
            )}
            {serviceCats.length > 0 && (
              <>
                <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Services</div>
                {serviceCats.map((c) => (
                  <SelectItem key={c.id} value={c.slug}>
                    {c.service?.parent ? `${c.service.parent.title} / ${c.name}` : c.name}
                  </SelectItem>
                ))}
              </>
            )}
            {standaloneCats.length > 0 && (
              <>
                <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Standalone</div>
                {standaloneCats.map((c) => <SelectItem key={c.id} value={c.slug}>{c.name}</SelectItem>)}
              </>
            )}
          </SelectContent>
        </Select>
        {categoryFilter !== "all" && (
          <span className="text-xs text-muted-foreground">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
        )}
        {categoryFilter !== "all" && selectedCategory && (
          <div className="flex items-center gap-2 ml-auto">
            <Switch
              id="pricing-enabled"
              checked={selectedCategory.pricingEnabled ?? true}
              onCheckedChange={(v) => togglePricing({ category: categoryFilter, pricingEnabled: v })}
            />
            <Label htmlFor="pricing-enabled" className="text-sm cursor-pointer">
              Pricing section {selectedCategory.pricingEnabled ?? true ? "enabled" : "disabled"}
            </Label>
          </div>
        )}
      </div>

      <ResourceTable resource={RESOURCE} data={filtered} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search plans..." />
      <PricingPlanModal />
      <DeleteModal resource={RESOURCE} onConfirm={deletePlan} isPending={isPending} />
    </div>
  );
}
