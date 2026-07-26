import {
  CreateResourceCategorySchema,
  ResourceCategoryKindSchema,
  type CreateResourceCategoryInput,
} from "../dtos";
import { resourceCategoryRepository } from "../repositories";

export const resourceCategoryService = {
  getAll(rawKind: string) {
    const kind = ResourceCategoryKindSchema.parse(rawKind);
    return resourceCategoryRepository.findAll(kind);
  },

  async create(rawKind: string, input: CreateResourceCategoryInput) {
    const kind = ResourceCategoryKindSchema.parse(rawKind);
    const data = CreateResourceCategorySchema.parse(input);
    const existing = await resourceCategoryRepository.findBySlug(kind, data.slug);
    if (existing) return existing;
    return resourceCategoryRepository.create(kind, data);
  },
};
