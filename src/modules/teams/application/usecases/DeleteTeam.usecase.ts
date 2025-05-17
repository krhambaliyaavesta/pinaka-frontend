import { ITeamService } from "../../domain/interfaces/ITeamService";

export class DeleteTeamUseCase {
  constructor(private readonly teamService: ITeamService) {}

  async execute(teamId: number): Promise<void> {
    return this.teamService.deleteTeam(teamId);
  }
} 