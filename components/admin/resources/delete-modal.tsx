"use client";

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useModalStore } from "@/store/modal.store";

interface DeleteModalProps {
  resource: string;
  onConfirm: (id: string) => void;
  isPending?: boolean;
}

export function DeleteModal({ resource, onConfirm, isPending }: DeleteModalProps) {
  const { type, resource: activeResource, record, close } = useModalStore();
  const isOpen = type === "delete" && activeResource === resource;

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {resource.replace(/-/g, " ")}</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this record.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={close}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => { onConfirm(record?.id as string); close(); }}
            disabled={isPending}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
