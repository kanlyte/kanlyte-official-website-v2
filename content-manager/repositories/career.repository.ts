import { prisma } from "@/lib/prisma";
import type { CreateCareerInput, UpdateCareerInput } from "../dtos";

export const careerRepository = {
  async findAll() {
    return await prisma.career.findMany({ orderBy: { order: "asc" } });
  },

  async findActive() {
    return await prisma.career.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  },

  async findById(id: string) {
    return await prisma.career.findUnique({ where: { id } });
  },

  async create(data: CreateCareerInput) {
    return await prisma.career.create({ data });
  },

  async update(id: string, data: UpdateCareerInput) {
    return await prisma.career.update({ where: { id }, data });
  },

  async delete(id: string) {
    return await prisma.career.delete({ where: { id } });
  },
};
