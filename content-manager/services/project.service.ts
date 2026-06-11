import { CreateProjectSchema, UpdateProjectSchema } from "../dtos";
import type { CreateProjectInput, UpdateProjectInput } from "../dtos";
import { projectRepository } from "../repositories";

export const projectService = {
  async getAll() {
    return await projectRepository.findAll();
  },

  async getActive() {
    return await projectRepository.findActive();
  },

  async getById(id: string) {
    const project = await projectRepository.findById(id);
    if (!project) throw new Error(`Project ${id} not found`);
    return project;
  },

  async create(input: CreateProjectInput) {
    const data = CreateProjectSchema.parse(input);
    return await projectRepository.create(data);
  },

  async update(id: string, input: UpdateProjectInput) {
    await projectService.getById(id);
    const data = UpdateProjectSchema.parse(input);
    return await projectRepository.update(id, data);
  },

  async delete(id: string) {
    await projectService.getById(id);
    return await projectRepository.delete(id);
  },
};
