import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Layers3 } from "lucide-react";
import { Hero } from "@/components/about-us/hero";
import { ProjectCard } from "@/components/home/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projectService } from "@/content-manager/services/project.service";

export const dynamic = "force-dynamic";

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [project, projects] = await Promise.all([
    projectService.getById(id).catch(() => null),
    projectService.getActive(),
  ]);

  if (!project) notFound();

  const titleWords = project.title.trim().split(/\s+/);
  const highlightedTitle = titleWords.length > 1 ? titleWords.at(-1) : project.title;
  const related = projects.filter((item) => item.id !== project.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <Hero
        backgroundImage="/images/office.jpeg"
        backgroundAlt="Kanlyte Uganda office"
        title={project.title}
        highlightedTitle={highlightedTitle}
        tagline="Kanlyte Project"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title, isActive: true },
        ]}
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <Link href="/projects" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#6EBE45] hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to featured projects
        </Link>

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,.55fr)]">
          <div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xl shadow-slate-900/10">
              <Image
                src={project.image}
                alt={`${project.title} project preview`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 760px"
              />
            </div>

            <article className="pt-12">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#6EBE45]">Project overview</p>
              <h2 className="mb-5 text-3xl font-bold text-[#212529] md:text-4xl">The solution</h2>
              <p className="border-l-4 border-[#6EBE45] pl-5 text-lg leading-8 text-gray-600">{project.description}</p>
            </article>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-20">
            <div className="rounded-2xl border border-[#6EBE45]/20 bg-gradient-to-br from-[#6EBE45]/5 to-[#6EBE45]/10 p-7">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#6EBE45] text-white">
                <Layers3 className="h-5 w-5" />
              </div>
              <h2 className="mb-4 text-xl font-bold text-[#212529]">Technology & capabilities</h2>
              <div className="space-y-3">
                {project.tags.map((tag) => (
                  <div key={tag} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#6EBE45]" /> {tag}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2 border-t border-[#6EBE45]/20 pt-6">
                {project.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-gray-50/70 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl bg-[#212529] px-8 py-12 text-center md:px-14">
            <p className="mb-3 text-sm font-semibold text-[#6EBE45]">Have a similar project in mind?</p>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Let&apos;s build your next digital solution.</h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-400">Tell us what you want to achieve and our team will help shape the right practical, scalable approach.</p>
            <Button asChild className="bg-[#6EBE45] px-8 py-6 text-base hover:bg-[#5a9e3a]">
              <Link href="/contact-us">Start Your Project <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#6EBE45]">More work</p>
              <h2 className="text-3xl font-bold text-[#212529]">Explore other projects</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProjectCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  tags={item.tags}
                  image={item.image}
                  viewDetailsHref={`/projects/${item.id}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
