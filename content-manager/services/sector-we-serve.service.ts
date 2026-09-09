import { CreateSectorWeServeSchema, UpdateSectorWeServeSchema } from "../dtos";
import type { CreateSectorWeServeInput, UpdateSectorWeServeInput } from "../dtos";
import { sectorWeServeRepository as _sectorWeServeRepository } from "../repositories";
import { withCache } from "@/lib/cached";

const sectorWeServeRepository = withCache("sectors-we-serve", _sectorWeServeRepository);

export const sectorWeServeService = {
  async getAll() {
    return await sectorWeServeRepository.findAll();
  },

  async getAllActive() {
    return await sectorWeServeRepository.findAllActive();
  },

  async getById(id: string) {
    const sector = await sectorWeServeRepository.findById(id);
    if (!sector) throw new Error(`Sector ${id} not found`);
    return sector;
  },

  async create(input: CreateSectorWeServeInput) {
    const data = CreateSectorWeServeSchema.parse(input);
    return await sectorWeServeRepository.create(data);
  },

  async update(id: string, input: UpdateSectorWeServeInput) {
    await sectorWeServeService.getById(id);
    const data = UpdateSectorWeServeSchema.parse(input);
    return await sectorWeServeRepository.update(id, data);
  },

  async delete(id: string) {
    await sectorWeServeService.getById(id);
    return await sectorWeServeRepository.delete(id);
  },
};
