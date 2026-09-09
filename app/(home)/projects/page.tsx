"use client";

import { Hero } from "@/components/about-us/hero";
import { ProjectCard } from "@/components/home/project-card";
import { useProjects } from "@/content-manager/hooks/useProjects";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
};

export default function ProjectsPage() {
  const { data: projects = [], isLoading } = useProjects(true) as {
    data?: Project[];
    isLoading: boolean;
  };

  return (
    <main className="min-h-screen bg-white">
      <Hero
        backgroundImage="/images/office.jpeg"
        backgroundAlt="Kanlyte Uganda office"
        title="Our Projects"
        highlightedTitle="Projects"
        tagline="Ideas Turned Into Solutions"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", isActive: true },
        ]}
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#6EBE45]">Selected work</p>
          <h2 className="mb-4 text-3xl font-bold text-[#212529] md:text-4xl">Digital solutions built for real needs</h2>
          <p className="text-lg leading-8 text-gray-600">
            Explore products, platforms and digital experiences delivered by Kanlyte across different industries and technology stacks.
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((item) => <div key={item} className="h-[430px] animate-pulse rounded-2xl bg-slate-100" />)}
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-slate-50 px-6 py-20 text-center">
            <h2 className="mb-2 text-xl font-bold text-slate-900">No projects published yet</h2>
            <p className="text-slate-500">Please check back soon to see our latest work.</p>
          </div>
        ) : (
          <>
            <p className="mb-8 text-sm text-gray-500">
              Showing {projects.length} project{projects.length === 1 ? "" : "s"}
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  image={project.image}
                  viewDetailsHref={`/projects/${project.id}`}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
