import { prisma } from "@/lib/prisma";
import type { CreateMilestoneInput, UpdateMilestoneInput } from "../dtos";

export const milestoneRepository = {
  async findAll() {
    return await prisma.milestone.findMany({ orderBy: { order: "asc" } });
  },

  async findById(id: string) {
    return await prisma.milestone.findUnique({ where: { id } });
  },

  async create(data: CreateMilestoneInput) {
    return await prisma.milestone.create({ data });
  },

  async update(id: string, data: UpdateMilestoneInput) {
    return await prisma.milestone.update({ where: { id }, data });
  },

  async delete(id: string) {
    return await prisma.milestone.delete({ where: { id } });
  },
};
