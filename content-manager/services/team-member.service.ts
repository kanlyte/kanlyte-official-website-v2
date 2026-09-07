import { CreateTeamMemberSchema, UpdateTeamMemberSchema } from "../dtos";
import type { CreateTeamMemberInput, UpdateTeamMemberInput } from "../dtos";
import { teamMemberRepository as _teamMemberRepository } from "../repositories";
import { withCache } from "@/lib/cached";

const teamMemberRepository = withCache("team-members", _teamMemberRepository);

export const teamMemberService = {
  async getAll() {
    return await teamMemberRepository.findAll();
  },

  async getActive() {
    return await teamMemberRepository.findActive();
  },

  async getFeatured() {
    return await teamMemberRepository.findFeatured();
  },

  async getById(id: string) {
    const member = await teamMemberRepository.findById(id);
    if (!member) throw new Error(`Team member ${id} not found`);
    return member;
  },

  async create(input: CreateTeamMemberInput) {
    const data = CreateTeamMemberSchema.parse(input);
    return await teamMemberRepository.create(data);
  },

  async update(id: string, input: UpdateTeamMemberInput) {
    await teamMemberService.getById(id);
    const data = UpdateTeamMemberSchema.parse(input);
    return await teamMemberRepository.update(id, data);
  },

  async delete(id: string) {
    await teamMemberService.getById(id);
    return await teamMemberRepository.delete(id);
  },
};
