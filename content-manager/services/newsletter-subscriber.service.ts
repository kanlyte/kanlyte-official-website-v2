import { CreateNewsletterSubscriberSchema, UpdateNewsletterSubscriberSchema } from "../dtos";
import type { CreateNewsletterSubscriberInput, UpdateNewsletterSubscriberInput } from "../dtos";
import { newsletterSubscriberRepository } from "../repositories";

export const newsletterSubscriberService = {
  async getAll() {
    return await newsletterSubscriberRepository.findAll();
  },

  async getById(id: string) {
    const subscriber = await newsletterSubscriberRepository.findById(id);
    if (!subscriber) throw new Error(`Subscriber ${id} not found`);
    return subscriber;
  },

  async create(input: CreateNewsletterSubscriberInput) {
    const data = CreateNewsletterSubscriberSchema.parse(input);
    const existing = await newsletterSubscriberRepository.findByEmail(data.email);
    if (existing) throw new Error("This email already exists on our mailing list");
    return await newsletterSubscriberRepository.create(data);
  },

  async update(id: string, input: UpdateNewsletterSubscriberInput) {
    await newsletterSubscriberService.getById(id);
    const data = UpdateNewsletterSubscriberSchema.parse(input);
    return await newsletterSubscriberRepository.update(id, data);
  },

  async delete(id: string) {
    await newsletterSubscriberService.getById(id);
    return await newsletterSubscriberRepository.delete(id);
  },
};
