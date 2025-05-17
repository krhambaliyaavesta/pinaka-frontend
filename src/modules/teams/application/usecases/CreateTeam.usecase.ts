import { Team } from "../../domain/entities/Team";
import { ITeamService } from "../../domain/interfaces/ITeamService";

export class CreateTeamUseCase {
  constructor(private readonly teamService: ITeamService) {}

  async execute(name: string): Promise<Team> {
    return this.teamService.createTeam(name);
  }
} 