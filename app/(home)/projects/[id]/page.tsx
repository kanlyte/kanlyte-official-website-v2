"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProject } from "@/content-manager/hooks/useProjects";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
};

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: project, isLoading, isError } = useProject(id) as {
    data?: Project;
    isLoading: boolean;
    isError: boolean;
  };

  if (isLoading) {
    return (
      <main className="mx-auto min-h-[70vh] max-w-6xl px-6 py-20">
        <div className="mb-8 h-5 w-40 animate-pulse rounded bg-slate-200" />
        <div className="mb-6 h-14 max-w-3xl animate-pulse rounded bg-slate-200" />
        <div className="aspect-[16/8] animate-pulse rounded-3xl bg-slate-200" />
      </main>
    );
  }

  if (isError || !project) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-3 text-4xl font-bold text-slate-900">Project not found</h1>
        <p className="mb-8 text-slate-500">This project may have been removed or is no longer available.</p>
        <Button asChild><Link href="/#projects">Back to projects</Link></Button>
      </main>
    );
  }

  return (
    <main>
      <section className="border-b bg-gradient-to-b from-[#6EBE45]/10 to-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Link href="/#projects" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-[#6EBE45]">
            <ArrowLeft className="h-4 w-4" /> Back to projects
          </Link>
          <div className="max-w-4xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#6EBE45]">Kanlyte project</p>
            <h1 className="mb-6 text-4xl font-black leading-tight text-slate-900 md:text-6xl">{project.title}</h1>
            <p className="max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">{project.description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => <Badge key={tag} variant="secondary" className="px-3 py-1">{tag}</Badge>)}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="relative mb-16 aspect-[16/8] overflow-hidden rounded-3xl border bg-slate-100 shadow-2xl shadow-slate-900/10">
            <Image src={project.image} alt={`${project.title} project preview`} fill className="object-cover" priority sizes="(max-width: 1200px) 100vw, 1152px" />
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
            <article>
              <h2 className="mb-5 text-3xl font-bold text-slate-900">Project overview</h2>
              <p className="text-lg leading-8 text-slate-600">{project.description}</p>
              <h3 className="mb-5 mt-10 text-xl font-bold text-slate-900">Technology and capabilities</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {project.tags.map((tag) => (
                  <div key={tag} className="flex items-center gap-3 rounded-xl border bg-white p-4 text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#6EBE45]" /> {tag}
                  </div>
                ))}
              </div>
            </article>

            <aside className="h-fit rounded-2xl bg-slate-900 p-8 text-white lg:sticky lg:top-24">
              <p className="mb-3 text-sm font-semibold text-[#8bd267]">Have a similar project?</p>
              <h2 className="mb-4 text-2xl font-bold">Let&apos;s build the right solution for you.</h2>
              <p className="mb-7 text-sm leading-6 text-slate-300">Tell us about your goals and we&apos;ll help turn them into a practical digital product.</p>
              <Button asChild className="w-full bg-[#6EBE45] hover:bg-[#5da63b]">
                <Link href="/contact-us">Start a project <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
