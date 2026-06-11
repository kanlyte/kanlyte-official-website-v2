"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResourceTable, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { useContactSubmissions, useDeleteContactSubmission, useUpdateContactSubmission } from "@/content-manager/hooks/useContactSubmissions";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

const RESOURCE = "contact-submissions";

const STATUS_VARIANT: Record<string, "default" | "destructive" | "secondary"> = {
  pending: "destructive",
  contacted: "default",
  resolved: "secondary",
};

const STATUSES = ["all", "pending", "contacted", "resolved"];

const COLUMNS: ResourceColumn[] = [
  { key: "fullName", label: "Name" },
  { key: "email", label: "Email", render: (v) => <span className="text-sm text-muted-foreground">{v}</span> },
  { key: "service", label: "Service" },
  { key: "subject", label: "Subject", render: (v) => <span className="line-clamp-1 max-w-xs text-sm">{v}</span> },
  { key: "status", label: "Status", render: (v) => <Badge variant={STATUS_VARIANT[v] ?? "outline"} className="capitalize">{v}</Badge> },
  { key: "createdAt", label: "Date", render: (v) => <span className="text-xs text-muted-foreground">{format(new Date(v), "dd MMM yyyy")}</span> },
];

export default function ContactSubmissionsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const { data: all = [], isLoading } = useContactSubmissions();
  const { mutate: deleteSubmission, isPending: isDeleting } = useDeleteContactSubmission();
  const { mutate: updateStatus } = useUpdateContactSubmission();

  const filtered = statusFilter === "all" ? all : all.filter((s: any) => s.status === statusFilter);

  const handleMarkContacted = (id: string) => {
    updateStatus({ id, data: { status: "contacted" } }, {
      onSuccess: () => toast.success("Marked as contacted"),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-xl">Contact Submissions</h1>
          <p className="text-muted-foreground text-sm">View and manage website contact form inquiries.</p>
        </div>
        <div className="flex gap-1">
          {STATUSES.map((s) => (
            <Button key={s} size="sm" variant={statusFilter === s ? "default" : "outline"} className="capitalize" onClick={() => setStatusFilter(s)}>
              {s}
            </Button>
          ))}
        </div>
      </div>
      <ResourceTable resource={RESOURCE} data={filtered} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search submissions..." />
      <DeleteModal resource={RESOURCE} onConfirm={deleteSubmission} isPending={isDeleting} />
    </div>
  );
}
