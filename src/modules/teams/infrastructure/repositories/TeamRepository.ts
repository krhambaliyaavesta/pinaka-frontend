import { Team } from "../../domain/entities/Team";
import { ITeamRepository } from "../../domain/interfaces/ITeamRepository";
import { HttpClient } from "@/core/infrastructure/http/HttpClient";
import { HttpClientProvider } from "@/core/infrastructure/di/HttpClientProvider";

export class TeamRepository implements ITeamRepository {
  private httpClient: HttpClient;

  constructor() {
    // Use the existing HttpClientProvider from core infrastructure
    const provider = HttpClientProvider.getInstance();
    this.httpClient = provider.getClient(process.env.NEXT_PUBLIC_API_URL || "");
  }

  async getTeams(): Promise<Team[]> {
    try {
      const response = await this.httpClient.get<any>("/api/teams");

      return response.data.map(
        (team: any) =>
          new Team(team.id, team.name, team.createdAt, team.updatedAt)
      );
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error;
    }
  }

  async createTeam(name: string): Promise<Team> {
    try {
      const response = await this.httpClient.post<any>("/api/teams", { name });

      return new Team(
        response.data.id,
        response.data.name,
        response.data.createdAt,
        response.data.updatedAt
      );
    } catch (error) {
      console.error("Error creating team:", error);
      throw error;
    }
  }

  async deleteTeam(teamId: number): Promise<void> {
    try {
      await this.httpClient.delete<any>(`/api/teams/${teamId}`);
    } catch (error) {
      console.error("Error deleting team:", error);
      throw error;
    }
  }

  async updateTeam(teamId: number, name: string): Promise<Team> {
    try {
      const response = await this.httpClient.put<any>(`/api/teams/${teamId}`, {
        name,
      });

      return new Team(
        response.data.id,
        response.data.name,
        response.data.createdAt,
        response.data.updatedAt
      );
    } catch (error) {
      console.error("Error updating team:", error);
      throw error;
    }
  }
}
