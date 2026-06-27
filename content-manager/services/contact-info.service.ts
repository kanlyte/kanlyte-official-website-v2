import { ContactInfoSchema } from "../dtos/contact-info.dto";
import type { ContactInfoInput } from "../dtos/contact-info.dto";
import { contactInfoRepository } from "../repositories/contact-info.repository";

export const contactInfoService = {
  async get() {
    return await contactInfoRepository.find();
  },
  async upsert(input: ContactInfoInput) {
    return await contactInfoRepository.upsert(ContactInfoSchema.parse(input));
  },
};
