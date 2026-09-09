import { prisma } from "@/lib/prisma";
import type { CreateSocialLinkInput, UpdateSocialLinkInput } from "../dtos/social-link.dto";

export const socialLinkRepository = {
  async findAll() {
    return await prisma.socialLink.findMany({ orderBy: { order: "asc" } });
  },
  async findActive() {
    return await prisma.socialLink.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  },
  async findById(id: string) {
    return await prisma.socialLink.findUnique({ where: { id } });
  },
  async create(data: CreateSocialLinkInput) {
    return await prisma.socialLink.create({ data });
  },
  async update(id: string, data: UpdateSocialLinkInput) {
    return await prisma.socialLink.update({ where: { id }, data });
  },
  async delete(id: string) {
    return await prisma.socialLink.delete({ where: { id } });
  },
};
