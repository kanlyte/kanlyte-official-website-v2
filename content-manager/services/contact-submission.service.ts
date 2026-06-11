import { CreateContactSubmissionSchema, UpdateContactSubmissionSchema } from "../dtos";
import type { CreateContactSubmissionInput, UpdateContactSubmissionInput } from "../dtos";
import { contactSubmissionRepository } from "../repositories";

export const contactSubmissionService = {
  async getAll() {
    return await contactSubmissionRepository.findAll();
  },

  async getById(id: string) {
    const submission = await contactSubmissionRepository.findById(id);
    if (!submission) throw new Error(`Contact submission ${id} not found`);
    return submission;
  },

  async getByStatus(status: string) {
    return await contactSubmissionRepository.findByStatus(status);
  },

  async create(input: CreateContactSubmissionInput) {
    const data = CreateContactSubmissionSchema.parse(input);
    return await contactSubmissionRepository.create(data);
  },

  async updateStatus(id: string, input: UpdateContactSubmissionInput) {
    await contactSubmissionService.getById(id);
    const data = UpdateContactSubmissionSchema.parse(input);
    if (data.status === "contacted" && !data.contactedAt) {
      data.contactedAt = new Date();
    }
    return await contactSubmissionRepository.update(id, data);
  },

  async delete(id: string) {
    await contactSubmissionService.getById(id);
    return await contactSubmissionRepository.delete(id);
  },
};
