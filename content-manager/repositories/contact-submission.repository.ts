import { prisma } from "@/lib/prisma";
import type { CreateContactSubmissionInput, UpdateContactSubmissionInput } from "../dtos";

export const contactSubmissionRepository = {
  async findAll() {
    return await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });
  },

  async findById(id: string) {
    return await prisma.contactSubmission.findUnique({ where: { id } });
  },

  async findByStatus(status: string) {
    return await prisma.contactSubmission.findMany({ where: { status }, orderBy: { createdAt: "desc" } });
  },

  async create(data: CreateContactSubmissionInput) {
    return await prisma.contactSubmission.create({ data });
  },

  async update(id: string, data: UpdateContactSubmissionInput) {
    return await prisma.contactSubmission.update({ where: { id }, data });
  },

  async delete(id: string) {
    return await prisma.contactSubmission.delete({ where: { id } });
  },
};
