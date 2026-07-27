"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useModalStore } from "@/store/modal.store";
import { useCreateService, useServices, useUpdateService } from "@/content-manager/hooks/useServices";
import { CreateServiceSchema } from "@/content-manager/dtos/service.dto";
import type { CreateServiceInput } from "@/content-manager/dtos/service.dto";
import { IconPicker } from "@/components/admin/shared/icon-picker";
import { CreatableCategoryAutocomplete } from "@/components/admin/shared/creatable-category-autocomplete";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RESOURCE = "services";

export function ServiceModal() {
  const { type, resource, record, close } = useModalStore();
  const isCreate = type === "create" && resource === RESOURCE;
  const isEdit = type === "edit" && resource === RESOURCE;
  const isOpen = isCreate || isEdit;

  const { mutate: create, isPending: creating } = useCreateService();
  const { mutate: update, isPending: updating } = useUpdateService();
  const isPending = creating || updating;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CreateServiceInput>({
    resolver: zodResolver(CreateServiceSchema),
    defaultValues: { title: "", slug: "", description: "", icon: "", kind: "offering", parentId: null, category: null, featured: false, order: 0, isActive: true },
  });
  const { data: services = [] } = useServices();

  const isActive = watch("isActive");
  const featured = watch("featured");
  const icon = watch("icon");
  const kind = watch("kind");
  const parentId = watch("parentId");
  const mainServices = (services as { id: string; title: string; kind: string }[])
    .filter((service) => service.kind === "main" && service.id !== record?.id);

  useEffect(() => {
    if (isEdit && record) {
      reset({
        title: record.title as string,
        slug: (record.slug as string) ?? "",
        description: record.description as string,
        icon: record.icon as string,
        kind: (record.kind as "main" | "offering") ?? "offering",
        parentId: (record.parentId as string) ?? null,
        category: (record.category as string) ?? null,
        featured: (record.featured as boolean) ?? false,
        order: record.order as number,
        isActive: record.isActive as boolean,
      });
    } else if (isCreate) {
      reset({ title: "", slug: "", description: "", icon: "", kind: "offering", parentId: null, category: null, featured: false, order: 0, isActive: true });
    }
  }, [isEdit, isCreate, record, reset]);

  function onSubmit(data: CreateServiceInput) {
    if (isEdit) {
      update({ id: record?.id as string, data }, { onSuccess: close });
    } else {
      create(data, { onSuccess: close });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0">
        <DialogHeader className="px-6 pt-5 pb-3 border-b">
          <DialogTitle className="text-base">{isEdit ? "Edit Service" : "Add Service"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div className="space-y-1">
                <Label htmlFor="title" className="text-xs">Title</Label>
                <Input id="title" placeholder="Software Development" className="h-8 text-sm" {...register("title")} />
                {errors.title && <p className="text-destructive text-xs">{errors.title.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="slug" className="text-xs">Slug</Label>
                <Input id="slug" placeholder="software-development" className="h-8 text-sm" {...register("slug")} />
                {errors.slug && <p className="text-destructive text-xs">{errors.slug.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4">
              <div className="space-y-1">
                <Label className="text-xs">Service type</Label>
                <Select
                  value={kind}
                  onValueChange={(value: "main" | "offering") => {
                    setValue("kind", value, { shouldValidate: true });
                    if (value === "main") setValue("parentId", null);
                  }}
                >
                  <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main service</SelectItem>
                    <SelectItem value="offering">Service offering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Parent main service</Label>
                <Select
                  value={parentId ?? "none"}
                  onValueChange={(value) => setValue("parentId", value === "none" ? null : value, { shouldValidate: true })}
                  disabled={kind === "main"}
                >
                  <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="Select parent…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No parent</SelectItem>
                    {mainServices.map((service) => (
                      <SelectItem key={service.id} value={service.id}>{service.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Legacy category (optional)</Label>
              <CreatableCategoryAutocomplete
                kind="service"
                value={watch("category")}
                onChange={(category) => setValue("category", category || null, { shouldDirty: true, shouldValidate: true })}
                placeholder="Search or add a service category…"
                optional
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="order" className="text-xs">Order</Label>
              <Input id="order" type="number" className="h-8 text-sm w-32" {...register("order", { valueAsNumber: true })} />
              {errors.order && <p className="text-destructive text-xs">{errors.order.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="description" className="text-xs">Description</Label>
              <Textarea id="description" placeholder="Describe this service..." className="text-sm resize-none h-16" {...register("description")} />
              {errors.description && <p className="text-destructive text-xs">{errors.description.message}</p>}
            </div>

            <IconPicker
              label="Icon"
              value={icon}
              onChange={(name) => setValue("icon", name, { shouldValidate: true })}
              error={errors.icon?.message}
            />

            <div className="grid grid-cols-2 gap-x-4">
              <div className="space-y-1">
                <Label className="text-xs">Status</Label>
                <div className="flex items-center gap-2 h-8">
                  <Switch id="isActive" checked={isActive} onCheckedChange={(v) => setValue("isActive", v)} />
                  <span className="text-sm text-muted-foreground">{isActive ? "Active" : "Inactive"}</span>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Featured in navbar</Label>
                <div className="flex items-center gap-2 h-8">
                  <Switch id="featured" checked={featured} onCheckedChange={(v) => setValue("featured", v)} />
                  <span className="text-sm text-muted-foreground">{featured ? "Featured" : "Not featured"}</span>
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
