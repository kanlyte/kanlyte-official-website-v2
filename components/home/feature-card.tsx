import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/components/admin/shared/icon-picker";

interface FeatureCardProps {
  icon: LucideIcon | string;
  title: string;
  description?: string;
  step?: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, step, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-brand-primary/30 hover:shadow-md",
        className
      )}
    >
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative flex flex-col items-start gap-4">
        {step && (
          <span className="absolute right-0 top-0 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {step}
          </span>
        )}
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-primary/5 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
          {typeof icon === "string" ? (
            <DynamicIcon name={icon} className="h-6 w-6" />
          ) : (
            (() => { const Icon = icon; return <Icon className="h-6 w-6" />; })()
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          {description && (
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
