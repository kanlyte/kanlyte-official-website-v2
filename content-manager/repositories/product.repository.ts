import { prisma } from "@/lib/prisma";
import type { CreateProductInput, UpdateProductInput } from "../dtos";

export const productRepository = {
  async findAll() {
    return await prisma.product.findMany({ orderBy: { order: "asc" } });
  },

  async findActive() {
    return await prisma.product.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  },

  async findById(id: string) {
    return await prisma.product.findUnique({ where: { id } });
  },

  async findBySlug(slug: string) {
    return await prisma.product.findUnique({ where: { slug } });
  },

  async create(data: CreateProductInput) {
    return await prisma.product.create({ data });
  },

  async update(id: string, data: UpdateProductInput) {
    return await prisma.product.update({ where: { id }, data });
  },

  async delete(id: string) {
    return await prisma.product.delete({ where: { id } });
  },
};
