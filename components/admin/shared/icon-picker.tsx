"use client";

import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

export const ICON_LIST = [
  // Tech & Dev
  "Code", "Code2", "Terminal", "Cpu", "Smartphone", "Monitor", "Globe", "Cloud",
  "Server", "Database", "HardDrive", "Wifi", "Network", "Layers",
  // Business
  "Briefcase", "Building2", "Users", "BarChart2", "TrendingUp", "ShoppingCart",
  "CreditCard", "Wallet", "PieChart", "LineChart",
  // Communication
  "Mail", "Phone", "MessageCircle", "Video", "Headphones",
  // Education
  "School", "BookOpen", "GraduationCap", "Pencil", "ClipboardList",
  // Utilities
  "Settings", "Wrench", "Shield", "Lock", "Eye", "Search",
  "Zap", "Star", "CheckCircle", "Clock", "MapPin", "Camera",
] as const;

export type IconName = typeof ICON_LIST[number];

interface IconPickerProps {
  value?: string;
  onChange: (name: string) => void;
  label?: string;
  error?: string;
}

export function IconPicker({ value, onChange, label = "Icon", error }: IconPickerProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <span className={cn("text-xs leading-none", error ? "text-destructive" : "text-muted-foreground")}>
        {label}
      </span>
      <div className={cn(
        "rounded-md border p-2 grid grid-cols-10 gap-1",
        error ? "border-destructive" : "border-input",
      )}>
        {ICON_LIST.map((name) => {
          const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[name];
          const selected = value === name;
          return (
            <button
              key={name}
              type="button"
              title={name}
              onClick={() => onChange(name)}
              className={cn(
                "flex items-center justify-center w-7 h-7 rounded transition-colors",
                selected
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {Icon && <Icon size={14} />}
            </button>
          );
        })}
      </div>
      {value && (
        <span className="text-[11px] text-muted-foreground">
          Selected: <span className="font-medium text-foreground">{value}</span>
        </span>
      )}
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}

// Helper to render a lucide icon by string name
export function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}
