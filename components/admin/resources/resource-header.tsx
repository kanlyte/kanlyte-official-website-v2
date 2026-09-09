import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useModalStore } from "@/store/modal.store";

interface ResourceHeaderProps {
  title: string;
  description: string;
  resource: string;
}

export function ResourceHeader({ title, description, resource }: ResourceHeaderProps) {
  const open = useModalStore((s) => s.open);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-semibold text-xl">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <Button size="sm" onClick={() => open("create", resource)}>
        <Plus className="size-4" />
        Add New
      </Button>
    </div>
  );
}
