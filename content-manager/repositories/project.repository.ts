import { prisma } from "@/lib/prisma";
import type { CreateProjectInput, UpdateProjectInput } from "../dtos";

export const projectRepository = {
  async findAll() {
    return await prisma.project.findMany({ orderBy: { order: "asc" } });
  },

  async findActive() {
    return await prisma.project.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  },

  async findById(id: string) {
    return await prisma.project.findUnique({ where: { id } });
  },

  async create(data: CreateProjectInput) {
    return await prisma.project.create({ data });
  },

  async update(id: string, data: UpdateProjectInput) {
    return await prisma.project.update({ where: { id }, data });
  },

  async delete(id: string) {
    return await prisma.project.delete({ where: { id } });
  },
};
