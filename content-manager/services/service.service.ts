import { CreateServiceSchema, UpdateServiceSchema } from "../dtos";
import type { CreateServiceInput, UpdateServiceInput } from "../dtos";
import { serviceRepository } from "../repositories";

export const serviceService = {
  async getAll() {
    return await serviceRepository.findAll();
  },

  async getActive() {
    return await serviceRepository.findActive();
  },

  async getById(id: string) {
    const service = await serviceRepository.findById(id);
    if (!service) throw new Error(`Service ${id} not found`);
    return service;
  },

  async getBySlug(slug: string) {
    return await serviceRepository.findBySlug(slug);
  },

  async create(input: CreateServiceInput) {
    const data = CreateServiceSchema.parse(input);
    const existing = await serviceRepository.findBySlug(data.slug);
    if (existing) throw new Error(`Slug "${data.slug}" already exists`);
    return await serviceRepository.create(data);
  },

  async update(id: string, input: UpdateServiceInput) {
    await serviceService.getById(id);
    const data = UpdateServiceSchema.parse(input);
    if (data.slug) {
      const existing = await serviceRepository.findBySlug(data.slug);
      if (existing && existing.id !== id) throw new Error(`Slug "${data.slug}" already exists`);
    }
    return await serviceRepository.update(id, data);
  },

  async delete(id: string) {
    await serviceService.getById(id);
    return await serviceRepository.delete(id);
  },
};
