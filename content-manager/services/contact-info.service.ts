import { ContactInfoSchema } from "../dtos/contact-info.dto";
import type { ContactInfoInput } from "../dtos/contact-info.dto";
import { contactInfoRepository as _contactInfoRepository } from "../repositories/contact-info.repository";
import { withCache } from "@/lib/cached";

const contactInfoRepository = withCache("contact-info", _contactInfoRepository);

export const contactInfoService = {
  async get() {
    return await contactInfoRepository.find();
  },
  async upsert(input: ContactInfoInput) {
    return await contactInfoRepository.upsert(ContactInfoSchema.parse(input));
  },
};
