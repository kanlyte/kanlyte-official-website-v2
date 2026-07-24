import { CreateNewsPostSchema, UpdateNewsPostSchema } from "../dtos";
import type { CreateNewsPostInput, UpdateNewsPostInput } from "../dtos";
import { newsPostRepository } from "../repositories";

export const newsPostService = {
  async getAll() {
    return await newsPostRepository.findAll();
  },

  async getActive() {
    return await newsPostRepository.findActive();
  },

  async getById(id: string) {
    const post = await newsPostRepository.findById(id);
    if (!post) throw new Error(`News post ${id} not found`);
    return post;
  },

  async create(input: CreateNewsPostInput) {
    const data = CreateNewsPostSchema.parse(input);
    return await newsPostRepository.create(data);
  },

  async update(id: string, input: UpdateNewsPostInput) {
    await newsPostService.getById(id);
    const data = UpdateNewsPostSchema.parse(input);
    return await newsPostRepository.update(id, data);
  },

  async delete(id: string) {
    await newsPostService.getById(id);
    return await newsPostRepository.delete(id);
  },
};
