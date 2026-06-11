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

  async create(input: CreateServiceInput) {
    const data = CreateServiceSchema.parse(input);
    return await serviceRepository.create(data);
  },

  async update(id: string, input: UpdateServiceInput) {
    await serviceService.getById(id);
    const data = UpdateServiceSchema.parse(input);
    return await serviceRepository.update(id, data);
  },

  async delete(id: string) {
    await serviceService.getById(id);
    return await serviceRepository.delete(id);
  },
};
