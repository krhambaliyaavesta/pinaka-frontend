import { Team } from "../../domain/entities/Team";
import { ITeamService } from "../../domain/interfaces/ITeamService";

export class GetTeamsUseCase {
  constructor(private readonly teamService: ITeamService) {}

  async execute(): Promise<Team[]> {
    return this.teamService.getTeams();
  }
} 