import { prisma } from "@/lib/prisma";
import type { CreateOdooAppInput, UpdateOdooAppInput } from "../dtos";

export const odooAppRepository = {
  async findAll() {
    return await prisma.odooApp.findMany({ orderBy: { order: "asc" } });
  },

  async findActive() {
    return await prisma.odooApp.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  },

  async findById(id: string) {
    return await prisma.odooApp.findUnique({ where: { id } });
  },

  async create(data: CreateOdooAppInput) {
    return await prisma.odooApp.create({ data });
  },

  async update(id: string, data: UpdateOdooAppInput) {
    return await prisma.odooApp.update({ where: { id }, data });
  },

  async delete(id: string) {
    return await prisma.odooApp.delete({ where: { id } });
  },
};
