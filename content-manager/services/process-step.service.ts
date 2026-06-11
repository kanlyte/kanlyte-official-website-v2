import { CreateProcessStepSchema, UpdateProcessStepSchema } from "../dtos";
import type { CreateProcessStepInput, UpdateProcessStepInput } from "../dtos";
import { processStepRepository } from "../repositories";

export const processStepService = {
  async getAll() {
    return await processStepRepository.findAll();
  },

  async getById(id: string) {
    const step = await processStepRepository.findById(id);
    if (!step) throw new Error(`Process step ${id} not found`);
    return step;
  },

  async create(input: CreateProcessStepInput) {
    const data = CreateProcessStepSchema.parse(input);
    return await processStepRepository.create(data);
  },

  async update(id: string, input: UpdateProcessStepInput) {
    await processStepService.getById(id);
    const data = UpdateProcessStepSchema.parse(input);
    return await processStepRepository.update(id, data);
  },

  async delete(id: string) {
    await processStepService.getById(id);
    return await processStepRepository.delete(id);
  },
};
