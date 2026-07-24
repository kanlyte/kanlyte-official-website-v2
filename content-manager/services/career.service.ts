import { CreateCareerSchema, UpdateCareerSchema } from "../dtos";
import type { CreateCareerInput, UpdateCareerInput } from "../dtos";
import { careerRepository } from "../repositories";

export const careerService = {
  async getAll() {
    return await careerRepository.findAll();
  },

  async getActive() {
    return await careerRepository.findActive();
  },

  async getById(id: string) {
    const career = await careerRepository.findById(id);
    if (!career) throw new Error(`Career ${id} not found`);
    return career;
  },

  async create(input: CreateCareerInput) {
    const data = CreateCareerSchema.parse(input);
    return await careerRepository.create(data);
  },

  async update(id: string, input: UpdateCareerInput) {
    await careerService.getById(id);
    const data = UpdateCareerSchema.parse(input);
    return await careerRepository.update(id, data);
  },

  async delete(id: string) {
    await careerService.getById(id);
    return await careerRepository.delete(id);
  },
};
