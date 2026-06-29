import { CreatePageCapabilitySchema, UpdatePageCapabilitySchema } from "../dtos";
import type { CreatePageCapabilityInput, UpdatePageCapabilityInput } from "../dtos";
import { pageCapabilityRepository } from "../repositories";

export const pageCapabilityService = {
  async getAll() {
    return await pageCapabilityRepository.findAll();
  },

  async getBySlug(slug: string) {
    return await pageCapabilityRepository.findBySlug(slug);
  },

  async getById(id: string) {
    const item = await pageCapabilityRepository.findById(id);
    if (!item) throw new Error(`PageCapability ${id} not found`);
    return item;
  },

  async create(input: CreatePageCapabilityInput) {
    const data = CreatePageCapabilitySchema.parse(input);
    return await pageCapabilityRepository.create(data);
  },

  async update(id: string, input: UpdatePageCapabilityInput) {
    await pageCapabilityService.getById(id);
    const data = UpdatePageCapabilitySchema.parse(input);
    return await pageCapabilityRepository.update(id, data);
  },

  async delete(id: string) {
    await pageCapabilityService.getById(id);
    return await pageCapabilityRepository.delete(id);
  },
};
