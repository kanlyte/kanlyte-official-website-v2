import { prisma } from "@/lib/prisma";
import type { CreateServiceInput, UpdateServiceInput } from "../dtos";

export const serviceRepository = {
  async findAll() {
    return await prisma.service.findMany({ orderBy: { order: "asc" } });
  },

  async findActive() {
    return await prisma.service.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  },

  async findById(id: string) {
    return await prisma.service.findUnique({ where: { id } });
  },

  async findBySlug(slug: string) {
    return await prisma.service.findUnique({ where: { slug } });
  },

  async create(data: CreateServiceInput) {
    return await prisma.service.create({ data });
  },

  async update(id: string, data: UpdateServiceInput) {
    return await prisma.service.update({ where: { id }, data });
  },

  async delete(id: string) {
    return await prisma.service.delete({ where: { id } });
  },
};
