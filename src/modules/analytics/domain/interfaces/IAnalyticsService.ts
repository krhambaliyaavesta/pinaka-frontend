import {
  TopRecipient,
  TopTeam,
  TrendingCategory,
  TrendingKeyword,
} from "../entities/Analytics";
import { AnalyticsParams } from "./IAnalyticsRepository";

/**
 * Interface for the Analytics Service
 * Provides methods to access analytics data
 */
export interface IAnalyticsService {
  /**
   * Get top recipients of kudos
   * @param params Query parameters for period and limit
   */
  getTopRecipients(params: AnalyticsParams): Promise<TopRecipient[]>;

  /**
   * Get top teams by kudos
   * @param params Query parameters for period and limit
   */
  getTopTeams(params: AnalyticsParams): Promise<TopTeam[]>;

  /**
   * Get trending categories
   * @param params Query parameters for period and limit
   */
  getTrendingCategories(params: AnalyticsParams): Promise<TrendingCategory[]>;

  /**
   * Get trending keywords
   * @param params Query parameters for period and limit
   */
  getTrendingKeywords(params: AnalyticsParams): Promise<TrendingKeyword[]>;
}
