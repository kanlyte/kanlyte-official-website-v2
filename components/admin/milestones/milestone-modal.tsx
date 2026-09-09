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
import { useCreateMilestone, useUpdateMilestone } from "@/content-manager/hooks/useMilestones";
import { CreateMilestoneSchema } from "@/content-manager/dtos/milestone.dto";
import type { CreateMilestoneInput } from "@/content-manager/dtos/milestone.dto";
import { ImageUpload } from "@/components/admin/shared/image-upload";

const RESOURCE = "milestones";

export function MilestoneModal() {
  const { type, resource, record, close } = useModalStore();
  const isCreate = type === "create" && resource === RESOURCE;
  const isEdit = type === "edit" && resource === RESOURCE;
  const isOpen = isCreate || isEdit;

  const { mutate: create, isPending: creating } = useCreateMilestone();
  const { mutate: update, isPending: updating } = useUpdateMilestone();
  const isPending = creating || updating;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CreateMilestoneInput>({
    resolver: zodResolver(CreateMilestoneSchema),
    defaultValues: { year: "", title: "", description: "", image: "", imageAlt: "", order: 0 },
  });

  useEffect(() => {
    if (isEdit && record) {
      reset({
        year: record.year as string,
        title: record.title as string,
        description: record.description as string,
        image: record.image as string,
        imageAlt: record.imageAlt as string,
        order: record.order as number,
      });
    } else if (isCreate) {
      reset({ year: "", title: "", description: "", image: "", imageAlt: "", order: 0 });
    }
  }, [isEdit, isCreate, record, reset]);

  function onSubmit(data: CreateMilestoneInput) {
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
          <DialogTitle className="text-base">{isEdit ? "Edit Milestone" : "Add Milestone"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 space-y-3">
            <div className="grid grid-cols-3 gap-x-4">
              <div className="space-y-1">
                <Label htmlFor="year" className="text-xs">Year</Label>
                <Input id="year" placeholder="2022" className="h-8 text-sm" {...register("year")} />
                {errors.year && <p className="text-destructive text-xs">{errors.year.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="title" className="text-xs">Title</Label>
                <Input id="title" placeholder="Our Founding" className="h-8 text-sm" {...register("title")} />
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
              <Textarea id="description" placeholder="Describe this milestone..." className="text-sm resize-none h-20" {...register("description")} />
              {errors.description && <p className="text-destructive text-xs">{errors.description.message}</p>}
            </div>

            <ImageUpload
              label="Image"
              value={watch("image")}
              onChange={(url) => setValue("image", url, { shouldValidate: true })}
            />
            {errors.image && <p className="text-destructive text-xs">{errors.image.message}</p>}

            <div className="space-y-1">
              <Label htmlFor="imageAlt" className="text-xs">Image Alt Text</Label>
              <Input id="imageAlt" placeholder="Describe the image for accessibility" className="h-8 text-sm" {...register("imageAlt")} />
              {errors.imageAlt && <p className="text-destructive text-xs">{errors.imageAlt.message}</p>}
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
