"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useModalStore } from "@/store/modal.store";
import { useCreatePageContent, useUpdatePageContent } from "@/content-manager/hooks/usePageContent";
import { CreatePageContentSchema } from "@/content-manager/dtos/page-content.dto";
import type { CreatePageContentInput } from "@/content-manager/dtos/page-content.dto";

const RESOURCE = "page-content";

const PAGE_SLUGS = [
  { value: "odoo", label: "Odoo ERP", type: "product" },
  { value: "school-sync", label: "School Sync", type: "product" },
  { value: "lyte", label: "Lyte App", type: "product" },
  { value: "research-innovation", label: "Research & Innovation", type: "service" },
  { value: "web-cloud", label: "Web & Cloud Services", type: "service" },
  { value: "software-development", label: "Software Development", type: "service" },
  { value: "ict-training", label: "ICT Training & Consultancy", type: "service" },
  { value: "email-hosting", label: "Email Hosting (standalone)", type: "service" },
  { value: "app-development", label: "App Development (standalone)", type: "service" },
];

export function PageContentModal() {
  const { type, resource, record, close } = useModalStore();
  const isCreate = type === "create" && resource === RESOURCE;
  const isEdit = type === "edit" && resource === RESOURCE;
  const isOpen = isCreate || isEdit;

  const { mutate: create, isPending: creating } = useCreatePageContent();
  const { mutate: update, isPending: updating } = useUpdatePageContent();
  const isPending = creating || updating;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CreatePageContentInput>({
    resolver: zodResolver(CreatePageContentSchema),
    defaultValues: {
      slug: "", pageType: "service", badge: "", title: "", highlight: "",
      subtitle: "", description: "", primaryBtnLabel: "", primaryBtnHref: "",
      secondaryBtnLabel: "", secondaryBtnHref: "", annotationLine1: "", annotationLine2: "", isActive: true,
    },
  });

  const isActive = watch("isActive");
  const pageType = watch("pageType");
  const slug = watch("slug");

  useEffect(() => {
    if (isEdit && record) {
      reset({
        slug: record.slug as string, pageType: record.pageType as "product" | "service",
        badge: record.badge as string, title: record.title as string, highlight: record.highlight as string,
        subtitle: record.subtitle as string, description: record.description as string,
        primaryBtnLabel: record.primaryBtnLabel as string, primaryBtnHref: record.primaryBtnHref as string,
        secondaryBtnLabel: record.secondaryBtnLabel as string, secondaryBtnHref: record.secondaryBtnHref as string,
        annotationLine1: record.annotationLine1 as string, annotationLine2: record.annotationLine2 as string,
        isActive: record.isActive as boolean,
      });
    } else if (isCreate) {
      reset({
        slug: "", pageType: "service", badge: "", title: "", highlight: "",
        subtitle: "", description: "", primaryBtnLabel: "", primaryBtnHref: "",
        secondaryBtnLabel: "", secondaryBtnHref: "", annotationLine1: "", annotationLine2: "", isActive: true,
      });
    }
  }, [isEdit, isCreate, record, reset]);

  function onSubmit(data: CreatePageContentInput) {
    if (isEdit) {
      update({ id: record?.id as string, data }, { onSuccess: close });
    } else {
      create(data, { onSuccess: close });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[680px] p-0 gap-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="px-6 pt-5 pb-3 border-b">
          <DialogTitle className="text-base">{isEdit ? "Edit Page Content" : "Add Page Content"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Slug</Label>
                <Select
                  value={slug}
                  onValueChange={(v) => {
                    setValue("slug", v, { shouldValidate: true });
                    const found = PAGE_SLUGS.find((p) => p.value === v);
                    if (found) setValue("pageType", found.type as "product" | "service");
                  }}
                >
                  <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select page..." /></SelectTrigger>
                  <SelectContent>
                    {PAGE_SLUGS.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        <span>{p.label}</span>
                        <span className="ml-2 text-xs text-muted-foreground capitalize">({p.type})</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.slug && <p className="text-destructive text-xs">{errors.slug.message}</p>}
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Page Type</Label>
                <Select value={pageType} onValueChange={(v) => setValue("pageType", v as "product" | "service")}>
                  <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Badge</Label>
              <Input placeholder="e.g. Web & Cloud Services — Kanlyte Uganda" className="h-8 text-sm" {...register("badge")} />
              {errors.badge && <p className="text-destructive text-xs">{errors.badge.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Title</Label>
                <Input placeholder="e.g. Your business," className="h-8 text-sm" {...register("title")} />
                {errors.title && <p className="text-destructive text-xs">{errors.title.message}</p>}
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Highlight (yellow underline word)</Label>
                <Input placeholder="e.g. always online." className="h-8 text-sm" {...register("highlight")} />
                {errors.highlight && <p className="text-destructive text-xs">{errors.highlight.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Subtitle (use * before the green underlined word)</Label>
              <Input placeholder="e.g. Fast, secure, *reliable!" className="h-8 text-sm" {...register("subtitle")} />
              {errors.subtitle && <p className="text-destructive text-xs">{errors.subtitle.message}</p>}
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Description</Label>
              <Textarea placeholder="Page description..." className="text-sm resize-none h-16" {...register("description")} />
              {errors.description && <p className="text-destructive text-xs">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Primary Button Label</Label>
                <Input placeholder="e.g. Get Started" className="h-8 text-sm" {...register("primaryBtnLabel")} />
                {errors.primaryBtnLabel && <p className="text-destructive text-xs">{errors.primaryBtnLabel.message}</p>}
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Primary Button Href</Label>
                <Input placeholder="e.g. /contact-us" className="h-8 text-sm" {...register("primaryBtnHref")} />
                {errors.primaryBtnHref && <p className="text-destructive text-xs">{errors.primaryBtnHref.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Secondary Button Label</Label>
                <Input placeholder="e.g. View Pricing" className="h-8 text-sm" {...register("secondaryBtnLabel")} />
                {errors.secondaryBtnLabel && <p className="text-destructive text-xs">{errors.secondaryBtnLabel.message}</p>}
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Secondary Button Href</Label>
                <Input placeholder="e.g. /pricing" className="h-8 text-sm" {...register("secondaryBtnHref")} />
                {errors.secondaryBtnHref && <p className="text-destructive text-xs">{errors.secondaryBtnHref.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Annotation Line 1</Label>
                <Input placeholder="e.g. 99.9%" className="h-8 text-sm" {...register("annotationLine1")} />
                {errors.annotationLine1 && <p className="text-destructive text-xs">{errors.annotationLine1.message}</p>}
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Annotation Line 2</Label>
                <Input placeholder="e.g. uptime guaranteed" className="h-8 text-sm" {...register("annotationLine2")} />
                {errors.annotationLine2 && <p className="text-destructive text-xs">{errors.annotationLine2.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Status</Label>
              <div className="flex items-center gap-2 h-8">
                <Switch id="isActive" checked={isActive} onCheckedChange={(v) => setValue("isActive", v)} />
                <span className="text-sm text-muted-foreground">{isActive ? "Active" : "Inactive"}</span>
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
