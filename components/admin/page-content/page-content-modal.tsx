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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useModalStore } from "@/store/modal.store";
import { useCreatePageContent, useUpdatePageContent, usePageContents } from "@/content-manager/hooks/usePageContent";
import { CreatePageContentSchema } from "@/content-manager/dtos/page-content.dto";
import type { CreatePageContentInput } from "@/content-manager/dtos/page-content.dto";
import { ImageUpload } from "@/components/admin/shared/image-upload";

const RESOURCE = "page-content";

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

  const { data: existingPages = [] } = usePageContents();
  const existingSlugs = (existingPages as { slug: string }[]).map((p) => p.slug);

  const isActive = watch("isActive");
  const pageType = watch("pageType");
  const slug = watch("slug");
  const isAboutHome = slug === "about-home";
  const isShowcaseHome = slug === "showcase-home";

  const [slugSuggestions, setSlugSuggestions] = useState<string[]>([]);

  function onSlugChange(value: string) {
    const normalized = value.toLowerCase().replace(/\s+/g, "-");
    setValue("slug", normalized, { shouldValidate: true });
    setSlugSuggestions(
      normalized.length > 0
        ? existingSlugs.filter((s) => s.includes(normalized) && s !== normalized)
        : []
    );
  }

  const [lines, setLines] = useState<string[]>([""]);

  useEffect(() => {
    if (isEdit && record) {
      reset({
        slug: record.slug as string, pageType: record.pageType as "product" | "service" | "section",
        badge: record.badge as string, title: record.title as string, highlight: record.highlight as string,
        subtitle: record.subtitle as string, description: record.description as string,
        primaryBtnLabel: record.primaryBtnLabel as string, primaryBtnHref: record.primaryBtnHref as string,
        secondaryBtnLabel: record.secondaryBtnLabel as string, secondaryBtnHref: record.secondaryBtnHref as string,
        annotationLine1: record.annotationLine1 as string, annotationLine2: record.annotationLine2 as string,
        annotationLines: record.annotationLines as string | undefined,
        isActive: record.isActive as boolean,
      });
      try {
        const parsed = JSON.parse((record.annotationLines as string) || "[]");
        if (parsed.length) {
          setLines(parsed);
          setValue("annotationLines", JSON.stringify(parsed));
        } else {
          const legacy = [
            record.annotationLine1 as string,
            record.annotationLine2 as string,
            record.subtitle as string,
          ].filter(Boolean);
          const initial = legacy.length ? legacy : [""];
          setLines(initial);
          setValue("annotationLines", JSON.stringify(initial.filter(Boolean)));
        }
      } catch {
        setLines([""]);
      }
    } else if (isCreate) {
      reset({
        slug: "", pageType: "service", badge: "", title: "", highlight: "",
        subtitle: "", description: "", primaryBtnLabel: "", primaryBtnHref: "",
        secondaryBtnLabel: "", secondaryBtnHref: "", annotationLine1: "", annotationLine2: "",
        annotationLines: undefined, isActive: true,
      });
      setLines([""]);
    }
  }, [isEdit, isCreate, record, reset, setValue]);

  function updateLine(index: number, value: string) {
    const updated = lines.map((l, i) => (i === index ? value : l));
    setLines(updated);
    setValue("annotationLines", JSON.stringify(updated.filter(Boolean)));
  }

  function addLine() { setLines((prev) => [...prev, ""]); }

  function removeLine(index: number) {
    const updated = lines.filter((_, i) => i !== index);
    setLines(updated.length ? updated : [""]);
    setValue("annotationLines", JSON.stringify(updated.filter(Boolean)));
  }

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
              <div className="space-y-1 relative">
                <Label className="text-xs">Slug</Label>
                <Input
                  value={slug}
                  onChange={(e) => onSlugChange(e.target.value)}
                  placeholder="e.g. cyber-security"
                  className="h-8 text-sm"
                  disabled={isEdit}
                />
                {slugSuggestions.length > 0 && (
                  <div className="absolute z-10 top-full left-0 right-0 bg-white border rounded-md shadow-md mt-0.5 max-h-36 overflow-y-auto">
                    {slugSuggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className="w-full text-left px-3 py-1.5 text-sm hover:bg-muted"
                        onClick={() => { setValue("slug", s, { shouldValidate: true }); setSlugSuggestions([]); }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
                {errors.slug && <p className="text-destructive text-xs">{errors.slug.message}</p>}
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Page Type</Label>
                <Select value={pageType} onValueChange={(v) => setValue("pageType", v as "product" | "service" | "section")}>
                  <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="section">Section</SelectItem>
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
              <Label className="text-xs">Subtitle{isAboutHome ? " (not used — highlights replace this)" : " (use * before the green underlined word)"}</Label>
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

            {isShowcaseHome ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <div className="space-y-1">
                  <Label className="text-xs">Image 1 (left, background)</Label>
                  <ImageUpload
                    label=""
                    value={watch("secondaryBtnLabel")}
                    onChange={(url) => setValue("secondaryBtnLabel", url, { shouldValidate: true })}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Image 2 (right, foreground)</Label>
                  <ImageUpload
                    label=""
                    value={watch("secondaryBtnHref")}
                    onChange={(url) => setValue("secondaryBtnHref", url, { shouldValidate: true })}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <div className="space-y-1">
                  <Label className="text-xs">Secondary Button Label{isAboutHome ? " (Image Alt Text)" : ""}</Label>
                  <Input placeholder="e.g. View Pricing" className="h-8 text-sm" {...register("secondaryBtnLabel")} />
                  {errors.secondaryBtnLabel && <p className="text-destructive text-xs">{errors.secondaryBtnLabel.message}</p>}
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{isAboutHome ? "Section Image" : "Secondary Button Href"}</Label>
                  {isAboutHome ? (
                    <ImageUpload
                      label=""
                      value={watch("secondaryBtnHref")}
                      onChange={(url) => setValue("secondaryBtnHref", url, { shouldValidate: true })}
                    />
                  ) : (
                    <Input placeholder="e.g. /pricing" className="h-8 text-sm" {...register("secondaryBtnHref")} />
                  )}
                  {errors.secondaryBtnHref && <p className="text-destructive text-xs">{errors.secondaryBtnHref.message}</p>}
                </div>
              </div>
            )}

            {!isAboutHome && !isShowcaseHome && (
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
            )}

            {isShowcaseHome && (
              <div className="space-y-2">
                <Label className="text-xs">Highlight Lines (checkmarks — one per line)</Label>
                <Input placeholder="e.g. Our Hands-on Trainings" className="h-8 text-sm" {...register("primaryBtnLabel")} />
                <Input placeholder="e.g. Fast Support 24*7" className="h-8 text-sm" {...register("annotationLine1")} />
                <Input placeholder="e.g. Affordable Prices" className="h-8 text-sm" {...register("annotationLine2")} />
              </div>
            )}

            {isAboutHome && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Highlight Lines (checkmarks)</Label>
                  <Button type="button" size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={addLine}>
                    <Plus className="w-3 h-3" /> Add Line
                  </Button>
                </div>
                {lines.map((line, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={line}
                      onChange={(e) => updateLine(i, e.target.value)}
                      placeholder={`e.g. Serving Uganda & beyond since 2018`}
                      className="h-8 text-sm flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive shrink-0"
                      onClick={() => removeLine(i)}
                      disabled={lines.length === 1}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

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
