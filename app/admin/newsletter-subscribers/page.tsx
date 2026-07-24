"use client";

import { Badge } from "@/components/ui/badge";
import { ResourceTable, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { useNewsletterSubscribers, useDeleteNewsletterSubscriber } from "@/content-manager/hooks/useNewsletterSubscribers";
import { format } from "date-fns";

const RESOURCE = "newsletter-subscribers";

const COLUMNS: ResourceColumn[] = [
  { key: "email", label: "Email" },
  { key: "isActive", label: "Status", render: (v) => <Badge variant={v ? "default" : "secondary"}>{v ? "Subscribed" : "Unsubscribed"}</Badge> },
  { key: "createdAt", label: "Subscribed On", render: (v) => <span className="text-xs text-muted-foreground">{format(new Date(v), "dd MMM yyyy")}</span> },
];

export default function NewsletterSubscribersPage() {
  const { data = [], isLoading } = useNewsletterSubscribers();
  const { mutate: deleteSubscriber, isPending } = useDeleteNewsletterSubscriber();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-semibold text-xl">Newsletter Subscribers</h1>
        <p className="text-muted-foreground text-sm">View and manage the mailing list.</p>
      </div>
      <ResourceTable resource={RESOURCE} data={data} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search subscribers..." />
      <DeleteModal resource={RESOURCE} onConfirm={deleteSubscriber} isPending={isPending} />
    </div>
  );
}
