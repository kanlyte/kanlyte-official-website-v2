import { CreatePageContentSchema, UpdatePageContentSchema } from "../dtos";
import type { CreatePageContentInput, UpdatePageContentInput } from "../dtos";
import { pageContentRepository as _pageContentRepository } from "../repositories";
import { withCache } from "@/lib/cached";

const pageContentRepository = withCache("page-content", _pageContentRepository);

export const pageContentService = {
  async getAll() {
    return await pageContentRepository.findAll();
  },

  async getBySlug(slug: string) {
    return await pageContentRepository.findBySlug(slug);
  },

  async getByPageType(pageType: string) {
    return await pageContentRepository.findByPageType(pageType);
  },

  async getById(id: string) {
    const item = await pageContentRepository.findById(id);
    if (!item) throw new Error(`PageContent ${id} not found`);
    return item;
  },

  async create(input: CreatePageContentInput) {
    const data = CreatePageContentSchema.parse(input);
    const existing = await pageContentRepository.findBySlug(data.slug);
    if (existing) throw new Error(`Slug "${data.slug}" already exists`);
    return await pageContentRepository.create(data);
  },

  async update(id: string, input: UpdatePageContentInput) {
    await pageContentService.getById(id);
    const data = UpdatePageContentSchema.parse(input);
    if (data.slug) {
      const existing = await pageContentRepository.findBySlug(data.slug);
      if (existing && existing.id !== id) throw new Error(`Slug "${data.slug}" already exists`);
    }
    return await pageContentRepository.update(id, data);
  },

  async delete(id: string) {
    await pageContentService.getById(id);
    return await pageContentRepository.delete(id);
  },
};
