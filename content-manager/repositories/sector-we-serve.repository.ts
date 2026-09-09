import { prisma } from "@/lib/prisma";
import type { CreateSectorWeServeInput, UpdateSectorWeServeInput } from "../dtos";

export const sectorWeServeRepository = {
  async findAll() {
    return await prisma.sectorWeServe.findMany({ orderBy: { order: "asc" } });
  },

  async findAllActive() {
    return await prisma.sectorWeServe.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  },

  async findById(id: string) {
    return await prisma.sectorWeServe.findUnique({ where: { id } });
  },

  async create(data: CreateSectorWeServeInput) {
    return await prisma.sectorWeServe.create({ data });
  },

  async update(id: string, data: UpdateSectorWeServeInput) {
    return await prisma.sectorWeServe.update({ where: { id }, data });
  },

  async delete(id: string) {
    return await prisma.sectorWeServe.delete({ where: { id } });
  },
};
