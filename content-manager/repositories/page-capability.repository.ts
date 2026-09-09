import { prisma } from "@/lib/prisma";
import type { CreatePageCapabilityInput, UpdatePageCapabilityInput } from "../dtos";

export const pageCapabilityRepository = {
  async findAll() {
    return await prisma.pageCapability.findMany({ orderBy: [{ slug: "asc" }, { order: "asc" }] });
  },

  async findBySlug(slug: string) {
    return await prisma.pageCapability.findMany({ where: { slug, isActive: true }, orderBy: { order: "asc" } });
  },

  async findById(id: string) {
    return await prisma.pageCapability.findUnique({ where: { id } });
  },

  async create(data: CreatePageCapabilityInput) {
    return await prisma.pageCapability.create({ data });
  },

  async update(id: string, data: UpdatePageCapabilityInput) {
    return await prisma.pageCapability.update({ where: { id }, data });
  },

  async delete(id: string) {
    return await prisma.pageCapability.delete({ where: { id } });
  },
};
