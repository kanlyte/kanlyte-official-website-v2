import { prisma } from "@/lib/prisma";
import type { CreateNewsPostInput, UpdateNewsPostInput } from "../dtos";

export const newsPostRepository = {
  async findAll() {
    return await prisma.newsPost.findMany({ orderBy: { order: "asc" } });
  },

  async findActive() {
    return await prisma.newsPost.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  },

  async findById(id: string) {
    return await prisma.newsPost.findUnique({ where: { id } });
  },

  async create(data: CreateNewsPostInput) {
    return await prisma.newsPost.create({ data });
  },

  async update(id: string, data: UpdateNewsPostInput) {
    return await prisma.newsPost.update({ where: { id }, data });
  },

  async delete(id: string) {
    return await prisma.newsPost.delete({ where: { id } });
  },
};
