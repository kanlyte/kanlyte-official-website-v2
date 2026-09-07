import { CreateSocialLinkSchema, UpdateSocialLinkSchema } from "../dtos/social-link.dto";
import type { CreateSocialLinkInput, UpdateSocialLinkInput } from "../dtos/social-link.dto";
import { socialLinkRepository as _socialLinkRepository } from "../repositories/social-link.repository";
import { withCache } from "@/lib/cached";

const socialLinkRepository = withCache("social-links", _socialLinkRepository);

export const socialLinkService = {
  async getAll() {
    return await socialLinkRepository.findAll();
  },
  async getActive() {
    return await socialLinkRepository.findActive();
  },
  async getById(id: string) {
    const link = await socialLinkRepository.findById(id);
    if (!link) throw new Error(`Social link ${id} not found`);
    return link;
  },
  async create(input: CreateSocialLinkInput) {
    return await socialLinkRepository.create(CreateSocialLinkSchema.parse(input));
  },
  async update(id: string, input: UpdateSocialLinkInput) {
    await socialLinkService.getById(id);
    return await socialLinkRepository.update(id, UpdateSocialLinkSchema.parse(input));
  },
  async delete(id: string) {
    await socialLinkService.getById(id);
    return await socialLinkRepository.delete(id);
  },
};
