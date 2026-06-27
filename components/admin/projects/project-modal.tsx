"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useModalStore } from "@/store/modal.store";
import { useCreateProject, useUpdateProject } from "@/content-manager/hooks/useProjects";
import { ImageUpload } from "@/components/admin/shared/image-upload";

const RESOURCE = "projects";

// Form uses a string for tags input, we transform on submit
const FormSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  order: z.number().int().nonnegative(),
  isActive: z.boolean().default(true),
});
type FormInput = z.infer<typeof FormSchema>;

export function ProjectModal() {
  const { type, resource, record, close } = useModalStore();
  const isCreate = type === "create" && resource === RESOURCE;
  const isEdit = type === "edit" && resource === RESOURCE;
  const isOpen = isCreate || isEdit;

  const { mutate: create, isPending: creating } = useCreateProject();
  const { mutate: update, isPending: updating } = useUpdateProject();
  const isPending = creating || updating;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: { title: "", description: "", image: "", order: 0, isActive: true },
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [tagError, setTagError] = useState("");

  const isActive = watch("isActive");

  useEffect(() => {
    if (isEdit && record) {
      reset({
        title: record.title as string,
        description: record.description as string,
        image: record.image as string,
        order: record.order as number,
        isActive: record.isActive as boolean,
      });
      setTags((record.tags as string[]) ?? []);
    } else if (isCreate) {
      reset({ title: "", description: "", image: "", order: 0, isActive: true });
      setTags([]);
    }
    setTagInput("");
    setTagError("");
  }, [isEdit, isCreate, record, reset]);

  function addTag() {
    const val = tagInput.trim();
    if (!val) return;
    if (tags.includes(val)) { setTagError("Tag already added"); return; }
    setTags((prev) => [...prev, val]);
    setTagInput("");
    setTagError("");
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  function onSubmit(data: FormInput) {
    if (tags.length === 0) { setTagError("At least one tag is required"); return; }
    const payload = { ...data, tags };
    if (isEdit) {
      update({ id: record?.id as string, data: payload }, { onSuccess: close });
    } else {
      create(payload, { onSuccess: close });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[620px] p-0 gap-0">
        <DialogHeader className="px-6 pt-5 pb-3 border-b">
          <DialogTitle className="text-base">{isEdit ? "Edit Project" : "Add Project"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-x-4">
              <div className="space-y-1">
                <Label htmlFor="title" className="text-xs">Title</Label>
                <Input id="title" placeholder="Project name" className="h-8 text-sm" {...register("title")} />
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
              <Textarea id="description" placeholder="Describe this project..." className="text-sm resize-none h-16" {...register("description")} />
              {errors.description && <p className="text-destructive text-xs">{errors.description.message}</p>}
            </div>

            <ImageUpload
              label="Project Image"
              value={watch("image")}
              onChange={(url) => setValue("image", url, { shouldValidate: true })}
            />
            {errors.image && <p className="text-destructive text-xs">{errors.image.message}</p>}

            {/* Tags */}
            <div className="space-y-1.5">
              <Label className="text-xs">Tags</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Next JS"
                  value={tagInput}
                  onChange={(e) => { setTagInput(e.target.value); setTagError(""); }}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                  className="h-8 text-sm"
                />
                <Button type="button" size="sm" variant="outline" onClick={addTag} className="h-8 shrink-0">
                  Add
                </Button>
              </div>
              {tagError && <p className="text-destructive text-xs">{tagError}</p>}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive transition-colors">
                        <X size={11} />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
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
