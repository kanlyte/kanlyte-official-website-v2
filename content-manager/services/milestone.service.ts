import { CreateMilestoneSchema, UpdateMilestoneSchema } from "../dtos";
import type { CreateMilestoneInput, UpdateMilestoneInput } from "../dtos";
import { milestoneRepository } from "../repositories";

export const milestoneService = {
  async getAll() {
    return await milestoneRepository.findAll();
  },

  async getById(id: string) {
    const milestone = await milestoneRepository.findById(id);
    if (!milestone) throw new Error(`Milestone ${id} not found`);
    return milestone;
  },

  async create(input: CreateMilestoneInput) {
    const data = CreateMilestoneSchema.parse(input);
    return await milestoneRepository.create(data);
  },

  async update(id: string, input: UpdateMilestoneInput) {
    await milestoneService.getById(id);
    const data = UpdateMilestoneSchema.parse(input);
    return await milestoneRepository.update(id, data);
  },

  async delete(id: string) {
    await milestoneService.getById(id);
    return await milestoneRepository.delete(id);
  },
};
