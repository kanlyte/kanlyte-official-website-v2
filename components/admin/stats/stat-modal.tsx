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
import { useModalStore } from "@/store/modal.store";
import { useCreateStat, useUpdateStat } from "@/content-manager/hooks/useStats";
import { CreateStatSchema } from "@/content-manager/dtos/stat.dto";
import type { CreateStatInput } from "@/content-manager/dtos/stat.dto";

const RESOURCE = "stats";

export function StatModal() {
  const { type, resource, record, close } = useModalStore();
  const isCreate = type === "create" && resource === RESOURCE;
  const isEdit = type === "edit" && resource === RESOURCE;
  const isOpen = isCreate || isEdit;

  const { mutate: create, isPending: creating } = useCreateStat();
  const { mutate: update, isPending: updating } = useUpdateStat();
  const isPending = creating || updating;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateStatInput>({
    resolver: zodResolver(CreateStatSchema),
    defaultValues: { label: "", value: "", order: 0 },
  });

  useEffect(() => {
    if (isEdit && record) {
      reset({ label: record.label as string, value: record.value as string, order: record.order as number });
    } else if (isCreate) {
      reset({ label: "", value: "", order: 0 });
    }
  }, [isEdit, isCreate, record, reset]);

  function onSubmit(data: CreateStatInput) {
    if (isEdit) {
      update({ id: record?.id as string, data }, { onSuccess: close });
    } else {
      create(data, { onSuccess: close });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <DialogHeader className="px-6 pt-5 pb-3 border-b">
          <DialogTitle className="text-base">{isEdit ? "Edit Stat" : "Add Stat"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 grid grid-cols-2 gap-x-4 gap-y-3">
            <div className="space-y-1">
              <Label htmlFor="value" className="text-xs">Value</Label>
              <Input id="value" placeholder="10+" className="h-8 text-sm" {...register("value")} />
              {errors.value && <p className="text-destructive text-xs">{errors.value.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="order" className="text-xs">Order</Label>
              <Input id="order" type="number" className="h-8 text-sm" {...register("order", { valueAsNumber: true })} />
              {errors.order && <p className="text-destructive text-xs">{errors.order.message}</p>}
            </div>
            <div className="col-span-2 space-y-1">
              <Label htmlFor="label" className="text-xs">Label</Label>
              <Input id="label" placeholder="Happy Customers" className="h-8 text-sm" {...register("label")} />
              {errors.label && <p className="text-destructive text-xs">{errors.label.message}</p>}
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
