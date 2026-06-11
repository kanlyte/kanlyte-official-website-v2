import { CreateTestimonialSchema, UpdateTestimonialSchema } from "../dtos";
import type { CreateTestimonialInput, UpdateTestimonialInput } from "../dtos";
import { testimonialRepository } from "../repositories";

export const testimonialService = {
  async getAll() {
    return await testimonialRepository.findAll();
  },

  async getActive() {
    return await testimonialRepository.findActive();
  },

  async getById(id: string) {
    const testimonial = await testimonialRepository.findById(id);
    if (!testimonial) throw new Error(`Testimonial ${id} not found`);
    return testimonial;
  },

  async create(input: CreateTestimonialInput) {
    const data = CreateTestimonialSchema.parse(input);
    return await testimonialRepository.create(data);
  },

  async update(id: string, input: UpdateTestimonialInput) {
    await testimonialService.getById(id);
    const data = UpdateTestimonialSchema.parse(input);
    return await testimonialRepository.update(id, data);
  },

  async delete(id: string) {
    await testimonialService.getById(id);
    return await testimonialRepository.delete(id);
  },
};
