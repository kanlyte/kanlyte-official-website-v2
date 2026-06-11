import { prisma } from "@/lib/prisma";
import type { CreateHeroSlideInput, UpdateHeroSlideInput } from "../dtos";

export const heroSlideRepository = {
  async findAll() {
    return await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
  },

  async findActive() {
    return await prisma.heroSlide.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  },

  async findById(id: string) {
    return await prisma.heroSlide.findUnique({ where: { id } });
  },

  async create(data: CreateHeroSlideInput) {
    return await prisma.heroSlide.create({ data });
  },

  async update(id: string, data: UpdateHeroSlideInput) {
    return await prisma.heroSlide.update({ where: { id }, data });
  },

  async delete(id: string) {
    return await prisma.heroSlide.delete({ where: { id } });
  },
};
