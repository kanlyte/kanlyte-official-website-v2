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
import { useModalStore } from "@/store/modal.store";
import { useCreateProcessStep, useUpdateProcessStep } from "@/content-manager/hooks/useProcessSteps";
import { CreateProcessStepSchema } from "@/content-manager/dtos/process-step.dto";
import type { CreateProcessStepInput } from "@/content-manager/dtos/process-step.dto";
import { IconPicker } from "@/components/admin/shared/icon-picker";

const RESOURCE = "process-steps";

export function ProcessStepModal() {
  const { type, resource, record, close } = useModalStore();
  const isCreate = type === "create" && resource === RESOURCE;
  const isEdit = type === "edit" && resource === RESOURCE;
  const isOpen = isCreate || isEdit;

  const { mutate: create, isPending: creating } = useCreateProcessStep();
  const { mutate: update, isPending: updating } = useUpdateProcessStep();
  const isPending = creating || updating;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CreateProcessStepInput>({
    resolver: zodResolver(CreateProcessStepSchema),
    defaultValues: { step: "", title: "", description: "", icon: "", order: 0 },
  });

  const icon = watch("icon");

  useEffect(() => {
    if (isEdit && record) {
      reset({
        step: record.step as string,
        title: record.title as string,
        description: record.description as string,
        icon: record.icon as string,
        order: record.order as number,
      });
    } else if (isCreate) {
      reset({ step: "", title: "", description: "", icon: "", order: 0 });
    }
  }, [isEdit, isCreate, record, reset]);

  function onSubmit(data: CreateProcessStepInput) {
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
          <DialogTitle className="text-base">{isEdit ? "Edit Process Step" : "Add Process Step"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 space-y-3">
            <div className="grid grid-cols-3 gap-x-4">
              <div className="space-y-1">
                <Label htmlFor="step" className="text-xs">Step Label</Label>
                <Input id="step" placeholder="Step 01" className="h-8 text-sm" {...register("step")} />
                {errors.step && <p className="text-destructive text-xs">{errors.step.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="title" className="text-xs">Title</Label>
                <Input id="title" placeholder="Discovery & Planning" className="h-8 text-sm" {...register("title")} />
                {errors.title && <p className="text-destructive text-xs">{errors.title.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="order" className="text-xs">Order</Label>
                <Input id="order" type="number" className="h-8 text-sm" {...register("order", { valueAsNumber: true })} />
                {errors.order && <p className="text-destructive text-xs">{errors.order.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="description" className="text-xs">Description</Label>
              <Textarea id="description" placeholder="Describe this step..." className="text-sm resize-none h-16" {...register("description")} />
              {errors.description && <p className="text-destructive text-xs">{errors.description.message}</p>}
            </div>

            <IconPicker
              label="Icon"
              value={icon}
              onChange={(name) => setValue("icon", name, { shouldValidate: true })}
              error={errors.icon?.message}
            />
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
