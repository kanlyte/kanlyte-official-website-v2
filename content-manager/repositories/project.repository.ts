import { prisma } from "@/lib/prisma";
import type { CreateProjectInput, UpdateProjectInput } from "../dtos";
import type { Project as PrismaProject } from "@prisma/client";

function deserialize<T extends PrismaProject>(project: T) {
  return { ...project, tags: JSON.parse(project.tags) as string[] };
}

export const projectRepository = {
  async findAll() {
    const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
    return projects.map(deserialize);
  },

  async findActive() {
    const projects = await prisma.project.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
    return projects.map(deserialize);
  },

  async findById(id: string) {
    const project = await prisma.project.findUnique({ where: { id } });
    return project ? deserialize(project) : null;
  },

  async create(data: CreateProjectInput) {
    const project = await prisma.project.create({ data: { ...data, tags: JSON.stringify(data.tags) } });
    return deserialize(project);
  },

  async update(id: string, data: UpdateProjectInput) {
    const project = await prisma.project.update({
      where: { id },
      data: { ...data, tags: data.tags ? JSON.stringify(data.tags) : undefined },
    });
    return deserialize(project);
  },

  async delete(id: string) {
    return await prisma.project.delete({ where: { id } });
  },
};
