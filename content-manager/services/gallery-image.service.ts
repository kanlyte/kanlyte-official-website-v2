import { CreateGalleryImageSchema, UpdateGalleryImageSchema } from "../dtos";
import type { CreateGalleryImageInput, UpdateGalleryImageInput } from "../dtos";
import { galleryImageRepository as _galleryImageRepository } from "../repositories";
import { withCache } from "@/lib/cached";

const galleryImageRepository = withCache("gallery-images", _galleryImageRepository);

export const galleryImageService = {
  async getAll() {
    return await galleryImageRepository.findAll();
  },

  async getActive() {
    return await galleryImageRepository.findActive();
  },

  async getById(id: string) {
    const image = await galleryImageRepository.findById(id);
    if (!image) throw new Error(`Gallery image ${id} not found`);
    return image;
  },

  async create(input: CreateGalleryImageInput) {
    const data = CreateGalleryImageSchema.parse(input);
    return await galleryImageRepository.create(data);
  },

  async update(id: string, input: UpdateGalleryImageInput) {
    await galleryImageService.getById(id);
    const data = UpdateGalleryImageSchema.parse(input);
    return await galleryImageRepository.update(id, data);
  },

  async delete(id: string) {
    await galleryImageService.getById(id);
    return await galleryImageRepository.delete(id);
  },
};
