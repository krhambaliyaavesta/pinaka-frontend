import { Team } from "../../domain/entities/Team";
import { ITeamRepository } from "../../domain/interfaces/ITeamRepository";
import { ITeamService } from "../../domain/interfaces/ITeamService";

export class TeamService implements ITeamService {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async getTeams(): Promise<Team[]> {
    try {
      return await this.teamRepository.getTeams();
    } catch (error) {
      console.error('Error in TeamService.getTeams:', error);
      throw error;
    }
  }

  async createTeam(name: string): Promise<Team> {
    try {
      return await this.teamRepository.createTeam(name);
    } catch (error) {
      console.error('Error in TeamService.createTeam:', error);
      throw error;
    }
  }

  async deleteTeam(teamId: number): Promise<void> {
    try {
      return await this.teamRepository.deleteTeam(teamId);
    } catch (error) {
      console.error('Error in TeamService.deleteTeam:', error);
      throw error;
    }
  }

  async updateTeam(teamId: number, name: string): Promise<Team> {
    try {
      return await this.teamRepository.updateTeam(teamId, name);
    } catch (error) {
      console.error('Error in TeamService.updateTeam:', error);
      throw error;
    }
  }
} 