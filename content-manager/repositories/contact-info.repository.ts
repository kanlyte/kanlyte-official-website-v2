import { prisma } from "@/lib/prisma";
import type { ContactInfoInput } from "../dtos/contact-info.dto";

export const contactInfoRepository = {
  async find() {
    return await prisma.contactInfo.findFirst();
  },
  async upsert(data: ContactInfoInput) {
    const existing = await prisma.contactInfo.findFirst();
    if (existing) {
      return await prisma.contactInfo.update({ where: { id: existing.id }, data });
    }
    return await prisma.contactInfo.create({ data });
  },
};
