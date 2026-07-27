"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useResourceCategories,
  useCreateResourceCategory,
  useUpdateResourceCategory,
  useDeleteResourceCategory,
  type ResourceCategory,
} from "@/content-manager/hooks/useResourceCategories";
import type { ResourceCategoryKind } from "@/content-manager/dtos";

function makeSlug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

interface CategoryManagerProps {
  kind: ResourceCategoryKind;
}

export function CategoryManager({ kind }: CategoryManagerProps) {
  const { data: categories = [], isLoading } = useResourceCategories(kind);
  const { mutate: create, isPending: creating } = useCreateResourceCategory(kind);
  const { mutate: update, isPending: updating } = useUpdateResourceCategory(kind);
  const { mutate: remove, isPending: deleting } = useDeleteResourceCategory(kind);

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<ResourceCategory | null>(null);
  const [toDelete, setToDelete] = useState<ResourceCategory | null>(null);
  const [name, setName] = useState("");

  function openCreate() {
    setEditing(null);
    setName("");
    setFormOpen(true);
  }

  function openEdit(cat: ResourceCategory) {
    setEditing(cat);
    setName(cat.name);
    setFormOpen(true);
  }

  function openDelete(cat: ResourceCategory) {
    setToDelete(cat);
    setDeleteOpen(true);
  }

  function handleSubmit() {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (editing) {
      update({ id: editing.id, name: trimmed }, { onSuccess: () => setFormOpen(false) });
    } else {
      create({ name: trimmed, slug: makeSlug(trimmed) }, { onSuccess: () => setFormOpen(false) });
    }
  }

  function handleDelete() {
    if (!toDelete) return;
    remove(toDelete.id, { onSuccess: () => setDeleteOpen(false) });
  }

  return (
    <>
      {/* Collapsible panel */}
      <div className="border rounded-lg bg-muted/30 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Tags className="w-4 h-4" />
            Categories
          </div>
          <Button type="button" size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={openCreate}>
            <Plus className="w-3 h-3" /> Add Category
          </Button>
        </div>

        {isLoading ? (
          <p className="text-xs text-muted-foreground">Loading...</p>
        ) : categories.length === 0 ? (
          <p className="text-xs text-muted-foreground">No categories yet. Add one to get started.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge key={cat.id} variant="secondary" className="flex items-center gap-1.5 pl-2.5 pr-1 py-1">
                <span className="text-xs">{cat.name}</span>
                <button
                  type="button"
                  onClick={() => openEdit(cat)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded"
                >
                  <Pencil className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => openDelete(cat)}
                  className="text-muted-foreground hover:text-destructive transition-colors p-0.5 rounded"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={formOpen} onOpenChange={(v) => !v && setFormOpen(false)}>
        <DialogContent className="sm:max-w-[360px] p-0 gap-0">
          <DialogHeader className="px-6 pt-5 pb-3 border-b">
            <DialogTitle className="text-base">
              {editing ? "Edit Category" : "Add Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="px-6 py-4 space-y-3">
            <div className="space-y-1">
              <Label className="text-xs">Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Software Development"
                className="h-8 text-sm"
                autoFocus
                onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
              />
              {name.trim() && !editing && (
                <p className="text-xs text-muted-foreground">Slug: {makeSlug(name)}</p>
              )}
            </div>
          </div>
          <DialogFooter className="px-6 py-3 border-t">
            <Button type="button" variant="outline" size="sm" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={creating || updating || !name.trim()}
              onClick={handleSubmit}
            >
              {creating || updating ? "Saving..." : editing ? "Save Changes" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={(v) => !v && setDeleteOpen(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete &ldquo;{toDelete?.name}&rdquo;?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this category. Services or products assigned to it will become uncategorised.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
