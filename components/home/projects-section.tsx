"use client";

import { ProjectCard } from "./project-card";

const projects = [
  {
    title: "Tours and Travel Agency Template",
    description:
      "The Tours and Travel Agency Template is a full-stack, production-ready solution with user dashboards and resend integration.",
    tags: ["Next JS", "Typescript", "Postgres"],
    image: "/images/project-02.webp",
  },
  {
    title: "Personal Portfolio Template",
    description:
      "The Personal Portfolio Template is a sleek, frontend-only solution designed for developers to showcase their work.",
    tags: ["Next JS", "Typescript", "Postgres"],
    image: "/images/project-04.webp",
  },
  {
    title: "Shop Dashboard Pro: Google Sheets",
    description:
      "You will get a complete, ready-to-deploy inventory management solution with secure data handling via Google Sheets.",
    tags: ["Next JS", "Typescript", "Postgres"],
    image: "/images/project-02.webp",
  },
];

export function ProjectsSection() {
  return (
    <section className="py-24 bg-white">
      {/* Same margin system for consistency */}
      <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-6xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-gray-900">
              Featured Projects
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Showing 1 - 3 of 12 projects
            </p>
          </div>
          <p className="text-sm font-bold text-gray-500">Page 1 of 4</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              image={project.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
