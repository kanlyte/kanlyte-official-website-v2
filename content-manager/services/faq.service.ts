import { CreateFAQSchema, UpdateFAQSchema } from "../dtos";
import type { CreateFAQInput, UpdateFAQInput } from "../dtos";
import { faqRepository as _faqRepository } from "../repositories";
import { withCache } from "@/lib/cached";

const faqRepository = withCache("faqs", _faqRepository);

export const faqService = {
  async getAll() {
    return await faqRepository.findAll();
  },

  async getActive() {
    return await faqRepository.findActive();
  },

  async getById(id: string) {
    const faq = await faqRepository.findById(id);
    if (!faq) throw new Error(`FAQ ${id} not found`);
    return faq;
  },

  async create(input: CreateFAQInput) {
    const data = CreateFAQSchema.parse(input);
    return await faqRepository.create(data);
  },

  async update(id: string, input: UpdateFAQInput) {
    await faqService.getById(id);
    const data = UpdateFAQSchema.parse(input);
    return await faqRepository.update(id, data);
  },

  async delete(id: string) {
    await faqService.getById(id);
    return await faqRepository.delete(id);
  },
};
