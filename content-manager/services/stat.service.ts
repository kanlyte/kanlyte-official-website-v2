import { CreateStatSchema, UpdateStatSchema } from "../dtos";
import type { CreateStatInput, UpdateStatInput } from "../dtos";
import { statRepository } from "../repositories";

export const statService = {
  async getAll() {
    return await statRepository.findAll();
  },

  async getById(id: string) {
    const stat = await statRepository.findById(id);
    if (!stat) throw new Error(`Stat ${id} not found`);
    return stat;
  },

  async create(input: CreateStatInput) {
    const data = CreateStatSchema.parse(input);
    return await statRepository.create(data);
  },

  async update(id: string, input: UpdateStatInput) {
    await statService.getById(id);
    const data = UpdateStatSchema.parse(input);
    return await statRepository.update(id, data);
  },

  async delete(id: string) {
    await statService.getById(id);
    return await statRepository.delete(id);
  },
};
