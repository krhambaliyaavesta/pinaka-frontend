import { Team } from "../entities/Team";

export interface ITeamService {
  getTeams(): Promise<Team[]>;
  createTeam(name: string): Promise<Team>;
  deleteTeam(teamId: number): Promise<void>;
  updateTeam(teamId: number, name: string): Promise<Team>;
} 