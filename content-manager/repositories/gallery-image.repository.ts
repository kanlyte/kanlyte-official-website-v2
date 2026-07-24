import { prisma } from "@/lib/prisma";
import type { CreateGalleryImageInput, UpdateGalleryImageInput } from "../dtos";

export const galleryImageRepository = {
  async findAll() {
    return await prisma.galleryImage.findMany({ orderBy: { order: "asc" } });
  },

  async findActive() {
    return await prisma.galleryImage.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  },

  async findById(id: string) {
    return await prisma.galleryImage.findUnique({ where: { id } });
  },

  async create(data: CreateGalleryImageInput) {
    return await prisma.galleryImage.create({ data });
  },

  async update(id: string, data: UpdateGalleryImageInput) {
    return await prisma.galleryImage.update({ where: { id }, data });
  },

  async delete(id: string) {
    return await prisma.galleryImage.delete({ where: { id } });
  },
};
