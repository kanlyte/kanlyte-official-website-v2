import { prisma } from "@/lib/prisma";
import type { CreateTeamMemberInput, UpdateTeamMemberInput } from "../dtos";

export const teamMemberRepository = {
  async findAll() {
    return await prisma.teamMember.findMany({ include: { social: true }, orderBy: { order: "asc" } });
  },

  async findActive() {
    return await prisma.teamMember.findMany({ where: { isActive: true }, include: { social: true }, orderBy: { order: "asc" } });
  },

  async findFeatured() {
    return await prisma.teamMember.findMany({ where: { featured: true, isActive: true }, include: { social: true }, orderBy: { order: "asc" } });
  },

  async findById(id: string) {
    return await prisma.teamMember.findUnique({ where: { id }, include: { social: true } });
  },

  async create(data: CreateTeamMemberInput) {
    const { social, ...rest } = data;
    return await prisma.teamMember.create({
      data: { ...rest, ...(social && { social: { create: social } }) },
      include: { social: true },
    });
  },

  async update(id: string, data: UpdateTeamMemberInput) {
    const { social, ...rest } = data;
    return await prisma.teamMember.update({
      where: { id },
      data: {
        ...rest,
        ...(social && {
          social: { upsert: { create: social, update: social } },
        }),
      },
      include: { social: true },
    });
  },

  async delete(id: string) {
    return await prisma.teamMember.delete({ where: { id } });
  },
};
