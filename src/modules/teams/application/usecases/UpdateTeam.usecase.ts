import { Team } from "../../domain/entities/Team";
import { ITeamService } from "../../domain/interfaces/ITeamService";

export class UpdateTeamUseCase {
  constructor(private readonly teamService: ITeamService) {}

  async execute(teamId: number, name: string): Promise<Team> {
    try {
      return await this.teamService.updateTeam(teamId, name);
    } catch (error) {
      console.error('Error in UpdateTeamUseCase:', error);
      throw error;
    }
  }
} 