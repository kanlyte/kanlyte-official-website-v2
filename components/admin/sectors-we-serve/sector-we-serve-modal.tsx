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
import { useCreateSectorWeServe, useUpdateSectorWeServe } from "@/content-manager/hooks/useSectorsWeServe";
import { CreateSectorWeServeSchema } from "@/content-manager/dtos/sector-we-serve.dto";
import type { CreateSectorWeServeInput } from "@/content-manager/dtos/sector-we-serve.dto";
import { IconPicker } from "@/components/admin/shared/icon-picker";

const RESOURCE = "sectors-we-serve";

export function SectorWeServeModal() {
  const { type, resource, record, close } = useModalStore();
  const isCreate = type === "create" && resource === RESOURCE;
  const isEdit = type === "edit" && resource === RESOURCE;
  const isOpen = isCreate || isEdit;

  const { mutate: create, isPending: creating } = useCreateSectorWeServe();
  const { mutate: update, isPending: updating } = useUpdateSectorWeServe();
  const isPending = creating || updating;

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<CreateSectorWeServeInput>({
    resolver: zodResolver(CreateSectorWeServeSchema),
    defaultValues: { name: "", description: "", icon: "Building2", order: 0, isActive: true },
  });

  useEffect(() => {
    if (isEdit && record) {
      reset({
        name: record.name as string,
        description: (record.description as string) ?? "",
        icon: record.icon as string,
        order: record.order as number,
        isActive: record.isActive as boolean,
      });
    } else if (isCreate) {
      reset({ name: "", description: "", icon: "Building2", order: 0, isActive: true });
    }
  }, [isEdit, isCreate, record, reset]);

  function onSubmit(data: CreateSectorWeServeInput) {
    if (isEdit) {
      update({ id: record?.id as string, data }, { onSuccess: close });
    } else {
      create(data, { onSuccess: close });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-lg p-0 gap-0">
        <DialogHeader className="px-6 pt-5 pb-3 border-b">
          <DialogTitle className="text-base">{isEdit ? "Edit Sector" : "Add Sector"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 grid grid-cols-2 gap-x-4 gap-y-3">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs">Name</Label>
              <Input id="name" placeholder="Education Institutions" className="h-8 text-sm" {...register("name")} />
              {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="order" className="text-xs">Order</Label>
              <Input id="order" type="number" className="h-8 text-sm" {...register("order", { valueAsNumber: true })} />
              {errors.order && <p className="text-destructive text-xs">{errors.order.message}</p>}
            </div>
            <div className="col-span-2 space-y-1">
              <Label htmlFor="description" className="text-xs">Description (optional)</Label>
              <Input id="description" placeholder="Brief description..." className="h-8 text-sm" {...register("description")} />
            </div>
            <div className="col-span-2">
              <IconPicker value={watch("icon")} onChange={(v) => setValue("icon", v)} label="Icon" error={errors.icon?.message} />
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <Switch
                id="isActive"
                checked={watch("isActive")}
                onCheckedChange={(v) => setValue("isActive", v)}
              />
              <Label htmlFor="isActive" className="text-xs">Active</Label>
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
