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
import { Switch } from "@/components/ui/switch";
import { useModalStore } from "@/store/modal.store";
import { useCreatePartner, useUpdatePartner } from "@/content-manager/hooks/usePartners";
import { CreatePartnerSchema } from "@/content-manager/dtos/partner.dto";
import type { CreatePartnerInput } from "@/content-manager/dtos/partner.dto";
import { ImageUpload } from "@/components/admin/shared/image-upload";

const RESOURCE = "partners";

export function PartnerModal() {
  const { type, resource, record, close } = useModalStore();
  const isCreate = type === "create" && resource === RESOURCE;
  const isEdit = type === "edit" && resource === RESOURCE;
  const isOpen = isCreate || isEdit;

  const { mutate: create, isPending: creating } = useCreatePartner();
  const { mutate: update, isPending: updating } = useUpdatePartner();
  const isPending = creating || updating;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CreatePartnerInput>({
    resolver: zodResolver(CreatePartnerSchema),
    defaultValues: { name: "", logo: "", url: "", order: 0, isActive: true },
  });

  const isActive = watch("isActive");

  useEffect(() => {
    if (isEdit && record) {
      reset({
        name: record.name as string,
        logo: record.logo as string,
        url: (record.url as string) ?? "",
        order: record.order as number,
        isActive: record.isActive as boolean,
      });
    } else if (isCreate) {
      reset({ name: "", logo: "", url: "", order: 0, isActive: true });
    }
  }, [isEdit, isCreate, record, reset]);

  function onSubmit(data: CreatePartnerInput) {
    const payload = { ...data, url: data.url || undefined };
    if (isEdit) {
      update({ id: record?.id as string, data: payload }, { onSuccess: close });
    } else {
      create(payload, { onSuccess: close });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[520px] p-0 gap-0">
        <DialogHeader className="px-6 pt-5 pb-3 border-b">
          <DialogTitle className="text-base">{isEdit ? "Edit Partner" : "Add Partner"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 grid grid-cols-2 gap-x-4 gap-y-3">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs">Name</Label>
              <Input id="name" placeholder="Lira University" className="h-8 text-sm" {...register("name")} />
              {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="order" className="text-xs">Order</Label>
              <Input id="order" type="number" className="h-8 text-sm" {...register("order", { valueAsNumber: true })} />
              {errors.order && <p className="text-destructive text-xs">{errors.order.message}</p>}
            </div>

            <div className="col-span-2 space-y-1">
              <Label htmlFor="url" className="text-xs">Website URL (optional)</Label>
              <Input id="url" placeholder="https://example.com" className="h-8 text-sm" {...register("url")} />
              {errors.url && <p className="text-destructive text-xs">{errors.url.message}</p>}
            </div>

            <div className="col-span-2">
              <ImageUpload
                label="Logo"
                value={watch("logo")}
                onChange={(url) => setValue("logo", url, { shouldValidate: true })}
              />
              {errors.logo && <p className="text-destructive text-xs">{errors.logo.message}</p>}
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
