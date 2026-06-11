import { prisma } from "@/lib/prisma";
import type { CreatePartnerInput, UpdatePartnerInput } from "../dtos";

export const partnerRepository = {
  async findAll() {
    return await prisma.partner.findMany({ orderBy: { order: "asc" } });
  },

  async findActive() {
    return await prisma.partner.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  },

  async findById(id: string) {
    return await prisma.partner.findUnique({ where: { id } });
  },

  async create(data: CreatePartnerInput) {
    return await prisma.partner.create({ data });
  },

  async update(id: string, data: UpdatePartnerInput) {
    return await prisma.partner.update({ where: { id }, data });
  },

  async delete(id: string) {
    return await prisma.partner.delete({ where: { id } });
  },
};
