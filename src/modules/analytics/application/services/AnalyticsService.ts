import { IAnalyticsService } from "../../domain/interfaces/IAnalyticsService";
import {
  IAnalyticsRepository,
  AnalyticsParams,
} from "../../domain/interfaces/IAnalyticsRepository";
import {
  TopRecipient,
  TopTeam,
  TrendingCategory,
  TrendingKeyword,
} from "../../domain/entities/Analytics";

/**
 * Implementation of the Analytics Service
 * Provides methods to access analytics data
 */
export class AnalyticsService implements IAnalyticsService {
  private repository: IAnalyticsRepository;

  /**
   * Create a new AnalyticsService
   * @param repository The analytics repository implementation
   */
  constructor(repository: IAnalyticsRepository) {
    this.repository = repository;
  }

  /**
   * Get top recipients of kudos
   * @param params Query parameters for period and limit
   */
  async getTopRecipients(params: AnalyticsParams): Promise<TopRecipient[]> {
    return this.repository.getTopRecipients(params);
  }

  /**
   * Get top teams by kudos
   * @param params Query parameters for period and limit
   */
  async getTopTeams(params: AnalyticsParams): Promise<TopTeam[]> {
    return this.repository.getTopTeams(params);
  }

  /**
   * Get trending categories
   * @param params Query parameters for period and limit
   */
  async getTrendingCategories(
    params: AnalyticsParams
  ): Promise<TrendingCategory[]> {
    return this.repository.getTrendingCategories(params);
  }

  /**
   * Get trending keywords
   * @param params Query parameters for period and limit
   */
  async getTrendingKeywords(
    params: AnalyticsParams
  ): Promise<TrendingKeyword[]> {
    return this.repository.getTrendingKeywords(params);
  }
}
