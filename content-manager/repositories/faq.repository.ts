import { prisma } from "@/lib/prisma";
import type { CreateFAQInput, UpdateFAQInput } from "../dtos";

export const faqRepository = {
  async findAll() {
    return await prisma.fAQ.findMany({ orderBy: { order: "asc" } });
  },

  async findActive() {
    return await prisma.fAQ.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  },

  async findById(id: string) {
    return await prisma.fAQ.findUnique({ where: { id } });
  },

  async create(data: CreateFAQInput) {
    return await prisma.fAQ.create({ data });
  },

  async update(id: string, data: UpdateFAQInput) {
    return await prisma.fAQ.update({ where: { id }, data });
  },

  async delete(id: string) {
    return await prisma.fAQ.delete({ where: { id } });
  },
};
