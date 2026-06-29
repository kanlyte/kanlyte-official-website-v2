import { prisma } from "@/lib/prisma";
import type { CreatePageContentInput, UpdatePageContentInput } from "../dtos";

export const pageContentRepository = {
  async findAll() {
    return await prisma.pageContent.findMany({ orderBy: { slug: "asc" } });
  },

  async findBySlug(slug: string) {
    return await prisma.pageContent.findUnique({ where: { slug } });
  },

  async findByPageType(pageType: string) {
    return await prisma.pageContent.findMany({ where: { pageType, isActive: true }, orderBy: { slug: "asc" } });
  },

  async findById(id: string) {
    return await prisma.pageContent.findUnique({ where: { id } });
  },

  async create(data: CreatePageContentInput) {
    return await prisma.pageContent.create({ data });
  },

  async update(id: string, data: UpdatePageContentInput) {
    return await prisma.pageContent.update({ where: { id }, data });
  },

  async delete(id: string) {
    return await prisma.pageContent.delete({ where: { id } });
  },
};
