import { TeamRepository } from "./infrastructure/repositories/TeamRepository";
import { TeamService } from "./application/services/TeamService";
import { GetTeamsUseCase } from "./application/usecases/GetTeams.usecase";
import { CreateTeamUseCase } from "./application/usecases/CreateTeam.usecase";
import { DeleteTeamUseCase } from "./application/usecases/DeleteTeam.usecase";
import { UpdateTeamUseCase } from "./application/usecases/UpdateTeam.usecase";
import { ITeamRepository } from "./domain/interfaces/ITeamRepository";
import { ITeamService } from "./domain/interfaces/ITeamService";

/**
 * Factory class for the Teams module
 * Handles dependency injection and creates instances of repositories, services, and use cases
 */
export class TeamsModule {
  private static repository: ITeamRepository | null = null;
  private static service: ITeamService | null = null;

  /**
   * Get the team repository instance (singleton)
   */
  static getRepository(): ITeamRepository {
    if (!this.repository) {
      this.repository = new TeamRepository();
    }
    return this.repository;
  }

  /**
   * Get the team service instance (singleton)
   */
  static getService(): ITeamService {
    if (!this.service) {
      this.service = new TeamService(this.getRepository());
    }
    return this.service;
  }

  /**
   * Create a new GetTeamsUseCase instance
   */
  static createGetTeamsUseCase(): GetTeamsUseCase {
    return new GetTeamsUseCase(this.getService());
  }

  /**
   * Create a new CreateTeamUseCase instance
   */
  static createCreateTeamUseCase(): CreateTeamUseCase {
    return new CreateTeamUseCase(this.getService());
  }

  /**
   * Create a new DeleteTeamUseCase instance
   */
  static createDeleteTeamUseCase(): DeleteTeamUseCase {
    return new DeleteTeamUseCase(this.getService());
  }

  /**
   * Create a new UpdateTeamUseCase instance
   */
  static createUpdateTeamUseCase(): UpdateTeamUseCase {
    return new UpdateTeamUseCase(this.getService());
  }

  /**
   * Log team errors with context
   * @param error The error to log
   * @param context Additional context information
   */
  static logError(error: unknown, context?: string): void {
    console.error(`Teams Module Error${context ? ` [${context}]` : ''}:`, error);
  }

  /**
   * Reset all module instances (useful for testing)
   */
  static reset(): void {
    this.repository = null;
    this.service = null;
  }
} 