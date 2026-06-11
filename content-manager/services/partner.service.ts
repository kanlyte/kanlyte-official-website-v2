import { CreatePartnerSchema, UpdatePartnerSchema } from "../dtos";
import type { CreatePartnerInput, UpdatePartnerInput } from "../dtos";
import { partnerRepository } from "../repositories";

export const partnerService = {
  async getAll() {
    return await partnerRepository.findAll();
  },

  async getActive() {
    return await partnerRepository.findActive();
  },

  async getById(id: string) {
    const partner = await partnerRepository.findById(id);
    if (!partner) throw new Error(`Partner ${id} not found`);
    return partner;
  },

  async create(input: CreatePartnerInput) {
    const data = CreatePartnerSchema.parse(input);
    return await partnerRepository.create(data);
  },

  async update(id: string, input: UpdatePartnerInput) {
    await partnerService.getById(id);
    const data = UpdatePartnerSchema.parse(input);
    return await partnerRepository.update(id, data);
  },

  async delete(id: string) {
    await partnerService.getById(id);
    return await partnerRepository.delete(id);
  },
};
