import { prisma } from "@/lib/prisma";
import type { CreateStatInput, UpdateStatInput } from "../dtos";

export const statRepository = {
  async findAll() {
    return await prisma.stat.findMany({ orderBy: { order: "asc" } });
  },

  async findById(id: string) {
    return await prisma.stat.findUnique({ where: { id } });
  },

  async create(data: CreateStatInput) {
    return await prisma.stat.create({ data });
  },

  async update(id: string, data: UpdateStatInput) {
    return await prisma.stat.update({ where: { id }, data });
  },

  async delete(id: string) {
    return await prisma.stat.delete({ where: { id } });
  },
};
