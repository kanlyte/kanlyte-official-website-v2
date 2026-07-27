"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardMetricCards } from "@/components/admin/dashboard/metric-cards";
import { RecentSubmissions } from "@/components/admin/dashboard/recent-submissions";
import { QuickLinks } from "@/components/admin/dashboard/quick-links";

export default function AdminPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6">
      <section className="relative overflow-hidden rounded-2xl bg-[#17211a] px-6 py-7 text-white shadow-sm md:px-8 md:py-9">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#6EBE45]/20 blur-2xl" />
        <div className="absolute -bottom-24 right-32 h-48 w-48 rounded-full border border-[#6EBE45]/20" />
        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8bd267]">Content management</p>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Welcome back, Admin</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
              Manage Kanlyte&apos;s services, products, projects and website enquiries from one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <Link href="/" target="_blank" rel="noopener noreferrer">
                View Website <ExternalLink className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild className="bg-[#6EBE45] text-white hover:bg-[#5da83b]">
              <Link href="/admin/projects">
                <Plus className="mr-2 size-4" /> Manage Projects
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <DashboardMetricCards />

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(320px,.7fr)]">
        <RecentSubmissions />
        <QuickLinks />
      </div>

      <Link href="/admin/contact-submissions" className="group flex items-center justify-between rounded-xl border bg-muted/30 px-5 py-4 text-sm transition-colors hover:border-primary/30 hover:bg-primary/5">
        <div>
          <p className="font-semibold">Need to follow up with a prospective client?</p>
          <p className="mt-1 text-xs text-muted-foreground">Review pending website enquiries and update their status.</p>
        </div>
        <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
      </Link>
    </div>
  );
}
