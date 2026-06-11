import { prisma } from "@/lib/prisma";
import type { CreateProcessStepInput, UpdateProcessStepInput } from "../dtos";

export const processStepRepository = {
  async findAll() {
    return await prisma.processStep.findMany({ orderBy: { order: "asc" } });
  },

  async findById(id: string) {
    return await prisma.processStep.findUnique({ where: { id } });
  },

  async create(data: CreateProcessStepInput) {
    return await prisma.processStep.create({ data });
  },

  async update(id: string, data: UpdateProcessStepInput) {
    return await prisma.processStep.update({ where: { id }, data });
  },

  async delete(id: string) {
    return await prisma.processStep.delete({ where: { id } });
  },
};
