import { CreateHeroSlideSchema, UpdateHeroSlideSchema } from "../dtos";
import type { CreateHeroSlideInput, UpdateHeroSlideInput } from "../dtos";
import { heroSlideRepository as _heroSlideRepository } from "../repositories";
import { withCache } from "@/lib/cached";

const heroSlideRepository = withCache("hero-slides", _heroSlideRepository);

export const heroSlideService = {
  async getAll() {
    return await heroSlideRepository.findAll();
  },

  async getActive() {
    return await heroSlideRepository.findActive();
  },

  async getById(id: string) {
    const slide = await heroSlideRepository.findById(id);
    if (!slide) throw new Error(`Hero slide ${id} not found`);
    return slide;
  },

  async create(input: CreateHeroSlideInput) {
    const data = CreateHeroSlideSchema.parse(input);
    return await heroSlideRepository.create(data);
  },

  async update(id: string, input: UpdateHeroSlideInput) {
    await heroSlideService.getById(id);
    const data = UpdateHeroSlideSchema.parse(input);
    return await heroSlideRepository.update(id, data);
  },

  async delete(id: string) {
    await heroSlideService.getById(id);
    return await heroSlideRepository.delete(id);
  },
};
