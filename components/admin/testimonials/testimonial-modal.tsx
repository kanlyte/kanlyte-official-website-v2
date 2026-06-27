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
import { useCreateTestimonial, useUpdateTestimonial } from "@/content-manager/hooks/useTestimonials";
import { CreateTestimonialSchema } from "@/content-manager/dtos/testimonial.dto";
import type { CreateTestimonialInput } from "@/content-manager/dtos/testimonial.dto";
import { ImageUpload } from "@/components/admin/shared/image-upload";

const RESOURCE = "testimonials";

export function TestimonialModal() {
  const { type, resource, record, close } = useModalStore();
  const isCreate = type === "create" && resource === RESOURCE;
  const isEdit = type === "edit" && resource === RESOURCE;
  const isOpen = isCreate || isEdit;

  const { mutate: create, isPending: creating } = useCreateTestimonial();
  const { mutate: update, isPending: updating } = useUpdateTestimonial();
  const isPending = creating || updating;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CreateTestimonialInput>({
    resolver: zodResolver(CreateTestimonialSchema),
    defaultValues: { name: "", location: "", text: "", image: "", order: 0, isActive: true },
  });

  const isActive = watch("isActive");

  useEffect(() => {
    if (isEdit && record) {
      reset({
        name: record.name as string,
        location: record.location as string,
        text: record.text as string,
        image: record.image as string,
        order: record.order as number,
        isActive: record.isActive as boolean,
      });
    } else if (isCreate) {
      reset({ name: "", location: "", text: "", image: "", order: 0, isActive: true });
    }
  }, [isEdit, isCreate, record, reset]);

  function onSubmit(data: CreateTestimonialInput) {
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
          <DialogTitle className="text-base">{isEdit ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-x-4">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-xs">Name</Label>
                <Input id="name" placeholder="John Doe" className="h-8 text-sm" {...register("name")} />
                {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="location" className="text-xs">Location</Label>
                <Input id="location" placeholder="Kampala, Uganda" className="h-8 text-sm" {...register("location")} />
                {errors.location && <p className="text-destructive text-xs">{errors.location.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4">
              <div className="space-y-1">
                <Label htmlFor="order" className="text-xs">Order</Label>
                <Input id="order" type="number" className="h-8 text-sm" {...register("order", { valueAsNumber: true })} />
                {errors.order && <p className="text-destructive text-xs">{errors.order.message}</p>}
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Status</Label>
                <div className="flex items-center gap-2 h-8">
                  <Switch id="isActive" checked={isActive} onCheckedChange={(v) => setValue("isActive", v)} />
                  <span className="text-sm text-muted-foreground">{isActive ? "Active" : "Inactive"}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="text" className="text-xs">Testimonial</Label>
              <Textarea id="text" placeholder="What the client said..." className="text-sm resize-none h-20" {...register("text")} />
              {errors.text && <p className="text-destructive text-xs">{errors.text.message}</p>}
            </div>

            <ImageUpload
              label="Client Photo"
              value={watch("image")}
              onChange={(url) => setValue("image", url, { shouldValidate: true })}
            />
            {errors.image && <p className="text-destructive text-xs">{errors.image.message}</p>}
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
