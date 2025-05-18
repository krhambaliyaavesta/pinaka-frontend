import { IAnalyticsService } from "../../domain/interfaces/IAnalyticsService";
import { AnalyticsParams } from "../../domain/interfaces/IAnalyticsRepository";
import { TopTeam } from "../../domain/entities/Analytics";

/**
 * Use case for fetching top teams
 */
export class GetTopTeamsUseCase {
  private service: IAnalyticsService;

  /**
   * Create a new GetTopTeamsUseCase
   * @param service The analytics service
   */
  constructor(service: IAnalyticsService) {
    this.service = service;
  }

  /**
   * Execute the use case
   * @param params Query parameters for the request
   * @returns Promise with the top teams data
   */
  async execute(params: AnalyticsParams): Promise<TopTeam[]> {
    return this.service.getTopTeams(params);
  }
}
