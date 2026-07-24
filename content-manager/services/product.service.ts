import { CreateProductSchema, UpdateProductSchema } from "../dtos";
import type { CreateProductInput, UpdateProductInput } from "../dtos";
import { productRepository } from "../repositories";

export const productService = {
  async getAll() {
    return await productRepository.findAll();
  },

  async getActive() {
    return await productRepository.findActive();
  },

  async getById(id: string) {
    const product = await productRepository.findById(id);
    if (!product) throw new Error(`Product ${id} not found`);
    return product;
  },

  async getBySlug(slug: string) {
    return await productRepository.findBySlug(slug);
  },

  async create(input: CreateProductInput) {
    const data = CreateProductSchema.parse(input);
    const existing = await productRepository.findBySlug(data.slug);
    if (existing) throw new Error(`Slug "${data.slug}" already exists`);
    return await productRepository.create(data);
  },

  async update(id: string, input: UpdateProductInput) {
    await productService.getById(id);
    const data = UpdateProductSchema.parse(input);
    if (data.slug) {
      const existing = await productRepository.findBySlug(data.slug);
      if (existing && existing.id !== id) throw new Error(`Slug "${data.slug}" already exists`);
    }
    return await productRepository.update(id, data);
  },

  async delete(id: string) {
    await productService.getById(id);
    return await productRepository.delete(id);
  },
};
