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
import { useCreateCareer, useUpdateCareer } from "@/content-manager/hooks/useCareers";
import { CreateCareerSchema } from "@/content-manager/dtos/career.dto";
import type { CreateCareerInput } from "@/content-manager/dtos/career.dto";

const RESOURCE = "careers";

export function CareerModal() {
  const { type, resource, record, close } = useModalStore();
  const isCreate = type === "create" && resource === RESOURCE;
  const isEdit = type === "edit" && resource === RESOURCE;
  const isOpen = isCreate || isEdit;

  const { mutate: create, isPending: creating } = useCreateCareer();
  const { mutate: update, isPending: updating } = useUpdateCareer();
  const isPending = creating || updating;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CreateCareerInput>({
    resolver: zodResolver(CreateCareerSchema),
    defaultValues: { title: "", department: "", location: "", type: "Full-time", description: "", applyEmail: "", order: 0, isActive: true },
  });

  const isActive = watch("isActive");

  useEffect(() => {
    if (isEdit && record) {
      reset({
        title: record.title as string,
        department: record.department as string,
        location: record.location as string,
        type: record.type as string,
        description: record.description as string,
        applyEmail: record.applyEmail as string,
        order: record.order as number,
        isActive: record.isActive as boolean,
      });
    } else if (isCreate) {
      reset({ title: "", department: "", location: "", type: "Full-time", description: "", applyEmail: "", order: 0, isActive: true });
    }
  }, [isEdit, isCreate, record, reset]);

  function onSubmit(data: CreateCareerInput) {
    if (isEdit) {
      update({ id: record?.id as string, data }, { onSuccess: close });
    } else {
      create(data, { onSuccess: close });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[620px] p-0 gap-0">
        <DialogHeader className="px-6 pt-5 pb-3 border-b">
          <DialogTitle className="text-base">{isEdit ? "Edit Job Opening" : "Add Job Opening"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-x-4">
              <div className="space-y-1">
                <Label htmlFor="title" className="text-xs">Job Title</Label>
                <Input id="title" placeholder="e.g. Frontend Developer" className="h-8 text-sm" {...register("title")} />
                {errors.title && <p className="text-destructive text-xs">{errors.title.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="department" className="text-xs">Department</Label>
                <Input id="department" placeholder="e.g. Engineering" className="h-8 text-sm" {...register("department")} />
                {errors.department && <p className="text-destructive text-xs">{errors.department.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-x-4">
              <div className="space-y-1">
                <Label htmlFor="location" className="text-xs">Location</Label>
                <Input id="location" placeholder="e.g. Kampala, Uganda" className="h-8 text-sm" {...register("location")} />
                {errors.location && <p className="text-destructive text-xs">{errors.location.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="type" className="text-xs">Type</Label>
                <Input id="type" placeholder="Full-time" className="h-8 text-sm" {...register("type")} />
                {errors.type && <p className="text-destructive text-xs">{errors.type.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="order" className="text-xs">Order</Label>
                <Input id="order" type="number" className="h-8 text-sm" {...register("order", { valueAsNumber: true })} />
                {errors.order && <p className="text-destructive text-xs">{errors.order.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="description" className="text-xs">Description</Label>
              <Textarea id="description" placeholder="Role responsibilities and requirements..." className="text-sm resize-none h-24" {...register("description")} />
              {errors.description && <p className="text-destructive text-xs">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-x-4">
              <div className="space-y-1">
                <Label htmlFor="applyEmail" className="text-xs">Apply Email</Label>
                <Input id="applyEmail" placeholder="careers@kanlyte.com" className="h-8 text-sm" {...register("applyEmail")} />
                {errors.applyEmail && <p className="text-destructive text-xs">{errors.applyEmail.message}</p>}
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Status</Label>
                <div className="flex items-center gap-2 h-8">
                  <Switch id="isActive" checked={isActive} onCheckedChange={(v) => setValue("isActive", v)} />
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
