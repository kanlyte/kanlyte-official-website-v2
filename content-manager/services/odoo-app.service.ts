import { CreateOdooAppSchema, UpdateOdooAppSchema } from "../dtos";
import type { CreateOdooAppInput, UpdateOdooAppInput } from "../dtos";
import { odooAppRepository as _odooAppRepository } from "../repositories";
import { withCache } from "@/lib/cached";

const odooAppRepository = withCache("odoo-apps", _odooAppRepository);

export const odooAppService = {
  async getAll() {
    return await odooAppRepository.findAll();
  },

  async getActive() {
    return await odooAppRepository.findActive();
  },

  async getById(id: string) {
    const app = await odooAppRepository.findById(id);
    if (!app) throw new Error(`Odoo app ${id} not found`);
    return app;
  },

  async create(input: CreateOdooAppInput) {
    const data = CreateOdooAppSchema.parse(input);
    return await odooAppRepository.create(data);
  },

  async update(id: string, input: UpdateOdooAppInput) {
    await odooAppService.getById(id);
    const data = UpdateOdooAppSchema.parse(input);
    return await odooAppRepository.update(id, data);
  },

  async delete(id: string) {
    await odooAppService.getById(id);
    return await odooAppRepository.delete(id);
  },
};
