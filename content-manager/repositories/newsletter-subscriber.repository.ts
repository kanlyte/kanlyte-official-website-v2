import { prisma } from "@/lib/prisma";
import type { CreateNewsletterSubscriberInput, UpdateNewsletterSubscriberInput } from "../dtos";

export const newsletterSubscriberRepository = {
  async findAll() {
    return await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } });
  },

  async findByEmail(email: string) {
    return await prisma.newsletterSubscriber.findUnique({ where: { email } });
  },

  async findById(id: string) {
    return await prisma.newsletterSubscriber.findUnique({ where: { id } });
  },

  async create(data: CreateNewsletterSubscriberInput) {
    return await prisma.newsletterSubscriber.create({ data });
  },

  async update(id: string, data: UpdateNewsletterSubscriberInput) {
    return await prisma.newsletterSubscriber.update({ where: { id }, data });
  },

  async delete(id: string) {
    return await prisma.newsletterSubscriber.delete({ where: { id } });
  },
};
