"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useModalStore } from "@/store/modal.store";
import { useCreatePageCapability, useUpdatePageCapability } from "@/content-manager/hooks/usePageCapabilities";
import { CreatePageCapabilitySchema } from "@/content-manager/dtos/page-capability.dto";
import type { CreatePageCapabilityInput } from "@/content-manager/dtos/page-capability.dto";
import { IconPicker } from "@/components/admin/shared/icon-picker";

const RESOURCE = "page-capabilities";

export function PageCapabilityModal() {
  const { type, resource, record, close } = useModalStore();
  const isCreate = type === "create" && resource === RESOURCE;
  const isEdit = type === "edit" && resource === RESOURCE;
  const isOpen = isCreate || isEdit;

  const { mutate: create, isPending: creating } = useCreatePageCapability();
  const { mutate: update, isPending: updating } = useUpdatePageCapability();
  const isPending = creating || updating;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CreatePageCapabilityInput>({
    resolver: zodResolver(CreatePageCapabilitySchema),
    defaultValues: { slug: "", name: "", icon: "", order: 0, isActive: true },
  });

  const isActive = watch("isActive");
  const icon = watch("icon");

  useEffect(() => {
    if (isEdit && record) {
      reset({
        slug: record.slug as string,
        name: record.name as string,
        icon: record.icon as string,
        order: record.order as number,
        isActive: record.isActive as boolean,
      });
    } else if (isCreate) {
      reset({ slug: "", name: "", icon: "", order: 0, isActive: true });
    }
  }, [isEdit, isCreate, record, reset]);

  function onSubmit(data: CreatePageCapabilityInput) {
    if (isEdit) {
      update({ id: record?.id as string, data }, { onSuccess: close });
    } else {
      create(data, { onSuccess: close });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[560px] p-0 gap-0">
        <DialogHeader className="px-6 pt-5 pb-3 border-b">
          <DialogTitle className="text-base">{isEdit ? "Edit Capability" : "Add Capability"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Page Slug</Label>
                <Input placeholder="e.g. web-cloud" className="h-8 text-sm" {...register("slug")} />
                {errors.slug && <p className="text-destructive text-xs">{errors.slug.message}</p>}
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Order</Label>
                <Input type="number" className="h-8 text-sm" {...register("order", { valueAsNumber: true })} />
                {errors.order && <p className="text-destructive text-xs">{errors.order.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Name</Label>
              <Input placeholder="e.g. Web Hosting" className="h-8 text-sm" {...register("name")} />
              {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
            </div>

            <IconPicker
              label="Icon"
              value={icon}
              onChange={(name) => setValue("icon", name, { shouldValidate: true })}
              error={errors.icon?.message}
            />

            <div className="space-y-1">
              <Label className="text-xs">Status</Label>
              <div className="flex items-center gap-2 h-8">
                <Switch checked={isActive} onCheckedChange={(v) => setValue("isActive", v)} />
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
