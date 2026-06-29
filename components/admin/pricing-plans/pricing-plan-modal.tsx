"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useModalStore } from "@/store/modal.store";
import { useCreatePricingPlan, useUpdatePricingPlan } from "@/content-manager/hooks/usePricingPlans";
import { CreatePricingPlanSchema } from "@/content-manager/dtos/pricing-plan.dto";
import type { CreatePricingPlanInput } from "@/content-manager/dtos/pricing-plan.dto";
import { Trash2, Plus } from "lucide-react";

const RESOURCE = "pricing-plans";

const CATEGORY_SUGGESTIONS = [
  "web-hosting", "email-hosting", "odoo", "school-sync", "lyte",
  "ict-training", "web-cloud", "software-development", "app-development",
  "research-innovation",
];

export function PricingPlanModal() {
  const { type, resource, record, close } = useModalStore();
  const isCreate = type === "create" && resource === RESOURCE;
  const isEdit = type === "edit" && resource === RESOURCE;
  const isOpen = isCreate || isEdit;

  const { mutate: create, isPending: creating } = useCreatePricingPlan();
  const { mutate: update, isPending: updating } = useUpdatePricingPlan();
  const isPending = creating || updating;

  const [features, setFeatures] = useState<string[]>([""]);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CreatePricingPlanInput>({
    resolver: zodResolver(CreatePricingPlanSchema),
    defaultValues: {
      category: "", tier: "", title: "", description: "",
      priceUGX: "", priceUSD: "", period: "", tagline: "",
      isPopular: false, buttonText: "Get Started",
      order: 0, isActive: true,
      features: [{ text: "", order: 0 }],
    },
  });

  const isPopular = watch("isPopular");
  const isActive = watch("isActive");

  useEffect(() => {
    if (isEdit && record) {
      const dbFeatures = (record.features as { text: string; order: number }[]) ?? [];
      const featureTexts = dbFeatures.map((f) => f.text);
      setFeatures(featureTexts.length ? featureTexts : [""]);
      reset({
        category: record.category as string,
        tier: record.tier as string,
        title: record.title as string,
        description: record.description as string,
        priceUGX: record.priceUGX as string,
        priceUSD: (record.priceUSD as string) ?? "",
        period: (record.period as string) ?? "",
        tagline: (record.tagline as string) ?? "",
        isPopular: record.isPopular as boolean,
        buttonText: record.buttonText as string,
        order: record.order as number,
        isActive: record.isActive as boolean,
        features: dbFeatures.length ? dbFeatures : [{ text: "", order: 0 }],
      });
    } else if (isCreate) {
      setFeatures([""]);
      reset({
        category: "", tier: "", title: "", description: "",
        priceUGX: "", priceUSD: "", period: "", tagline: "",
        isPopular: false, buttonText: "Get Started",
        order: 0, isActive: true,
        features: [{ text: "", order: 0 }],
      });
    }
  }, [isEdit, isCreate, record, reset]);

  function syncFeatures(updated: string[]) {
    setFeatures(updated);
    setValue("features", updated.filter(Boolean).map((text, i) => ({ text, order: i })));
  }

  function addFeature() { syncFeatures([...features, ""]); }
  function removeFeature(i: number) { syncFeatures(features.filter((_, idx) => idx !== i)); }
  function updateFeature(i: number, val: string) {
    const updated = [...features];
    updated[i] = val;
    syncFeatures(updated);
  }

  function onSubmit(data: CreatePricingPlanInput) {
    const payload = { ...data, features: features.filter(Boolean).map((text, i) => ({ text, order: i })) };
    if (isEdit) {
      update({ id: record?.id as string, data: payload }, { onSuccess: close });
    } else {
      create(payload, { onSuccess: close });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[640px] p-0 gap-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="px-6 pt-5 pb-3 border-b">
          <DialogTitle className="text-base">{isEdit ? "Edit Pricing Plan" : "Add Pricing Plan"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 space-y-3">

            {/* Category + Tier */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Category</Label>
                <Input list="category-suggestions" placeholder="e.g. odoo" className="h-8 text-sm" {...register("category")} />
                <datalist id="category-suggestions">
                  {CATEGORY_SUGGESTIONS.map((c) => <option key={c} value={c} />)}
                </datalist>
                {errors.category && <p className="text-destructive text-xs">{errors.category.message}</p>}
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Tier</Label>
                <Input placeholder="e.g. core / advanced / premium" className="h-8 text-sm" {...register("tier")} />
                {errors.tier && <p className="text-destructive text-xs">{errors.tier.message}</p>}
              </div>
            </div>

            {/* Title + Order */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Title</Label>
                <Input placeholder="e.g. Core Package" className="h-8 text-sm" {...register("title")} />
                {errors.title && <p className="text-destructive text-xs">{errors.title.message}</p>}
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Order</Label>
                <Input type="number" className="h-8 text-sm" {...register("order", { valueAsNumber: true })} />
                {errors.order && <p className="text-destructive text-xs">{errors.order.message}</p>}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <Label className="text-xs">Description</Label>
              <Textarea placeholder="Short plan description..." className="text-sm resize-none h-14" {...register("description")} />
              {errors.description && <p className="text-destructive text-xs">{errors.description.message}</p>}
            </div>

            {/* Prices */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Price UGX</Label>
                <Input placeholder="e.g. 800,000 UGX" className="h-8 text-sm" {...register("priceUGX")} />
                {errors.priceUGX && <p className="text-destructive text-xs">{errors.priceUGX.message}</p>}
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Price USD</Label>
                <Input placeholder="e.g. $225" className="h-8 text-sm" {...register("priceUSD")} />
              </div>
            </div>

            {/* Period + Button Text */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Period (optional)</Label>
                <Input placeholder="e.g. / month  or  / year" className="h-8 text-sm" {...register("period")} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Button Text</Label>
                <Input placeholder="e.g. Get Started" className="h-8 text-sm" {...register("buttonText")} />
                {errors.buttonText && <p className="text-destructive text-xs">{errors.buttonText.message}</p>}
              </div>
            </div>

            {/* Tagline */}
            <div className="space-y-1">
              <Label className="text-xs">Tagline (optional)</Label>
              <Input placeholder="e.g. Most Popular" className="h-8 text-sm" {...register("tagline")} />
            </div>

            {/* Features */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Features</Label>
                <Button type="button" variant="ghost" size="sm" className="h-6 text-xs gap-1" onClick={addFeature}>
                  <Plus className="w-3 h-3" /> Add
                </Button>
              </div>
              <div className="space-y-2">
                {features.map((f, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <Input
                      value={f}
                      onChange={(e) => updateFeature(i, e.target.value)}
                      placeholder={`Feature ${i + 1}`}
                      className="h-8 text-sm flex-1"
                    />
                    {features.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" className="size-7 text-destructive hover:text-destructive shrink-0" onClick={() => removeFeature(i)}>
                        <Trash2 className="size-3.5" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {errors.features && <p className="text-destructive text-xs">At least one feature is required</p>}
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-2 gap-x-4">
              <div className="space-y-1">
                <Label className="text-xs">Most Popular</Label>
                <div className="flex items-center gap-2 h-8">
                  <Switch checked={isPopular} onCheckedChange={(v) => setValue("isPopular", v)} />
                  <span className="text-sm text-muted-foreground">{isPopular ? "Yes" : "No"}</span>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Status</Label>
                <div className="flex items-center gap-2 h-8">
                  <Switch checked={isActive} onCheckedChange={(v) => setValue("isActive", v)} />
                  <span className="text-sm text-muted-foreground">{isActive ? "Active" : "Inactive"}</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-3 border-t">
            <Button type="button" variant="outline" size="sm" onClick={close} disabled={isPending}>Cancel</Button>
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending ? "Saving..." : isEdit ? "Save Changes" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
