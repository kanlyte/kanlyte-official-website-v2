import { prisma } from "@/lib/prisma";
import type { CreateTestimonialInput, UpdateTestimonialInput } from "../dtos";

export const testimonialRepository = {
  async findAll() {
    return await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  },

  async findActive() {
    return await prisma.testimonial.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  },

  async findById(id: string) {
    return await prisma.testimonial.findUnique({ where: { id } });
  },

  async create(data: CreateTestimonialInput) {
    return await prisma.testimonial.create({ data });
  },

  async update(id: string, data: UpdateTestimonialInput) {
    return await prisma.testimonial.update({ where: { id }, data });
  },

  async delete(id: string) {
    return await prisma.testimonial.delete({ where: { id } });
  },
};
