"use client";

import { Badge } from "@/components/ui/badge";
import { ResourceHeader } from "@/components/admin/resources/resource-header";
import { ResourceTable, ActiveBadge, OrderBadge, type ResourceColumn } from "@/components/admin/resources/resource-table";
import { DeleteModal } from "@/components/admin/resources/delete-modal";
import { TeamMemberModal } from "@/components/admin/team-members/team-member-modal";
import { useTeamMembers, useDeleteTeamMember } from "@/content-manager/hooks/useTeamMembers";
import Image from "next/image";

const RESOURCE = "team-members";

const COLUMNS: ResourceColumn[] = [
  { key: "order", label: "Order", render: (v) => <OrderBadge value={v} /> },
  { key: "name", label: "Member", render: (v, row) => (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full overflow-hidden relative shrink-0">
        <Image src={row.image} alt={v} fill className="object-cover" />
      </div>
      <div>
        <span className="font-medium text-sm block">{v}</span>
        <span className="text-xs text-muted-foreground">{row.role}</span>
      </div>
    </div>
  )},
  { key: "featured", label: "Featured", render: (v) => v ? <Badge variant="default">Featured</Badge> : <Badge variant="outline">No</Badge> },
  { key: "isActive", label: "Status", render: (v) => <ActiveBadge value={v} /> },
];

export default function TeamMembersPage() {
  const { data = [], isLoading } = useTeamMembers();
  const { mutate: deleteMember, isPending } = useDeleteTeamMember();

  return (
    <div className="flex flex-col gap-6">
      <ResourceHeader title="Team Members" description="Manage team members shown on the about page." resource={RESOURCE} />
      <ResourceTable resource={RESOURCE} data={data} columns={COLUMNS} isLoading={isLoading} searchPlaceholder="Search team members..." />
      <TeamMemberModal />
      <DeleteModal resource={RESOURCE} onConfirm={deleteMember} isPending={isPending} />
    </div>
  );
}
