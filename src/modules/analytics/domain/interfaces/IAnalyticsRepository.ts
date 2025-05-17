import {
  TopRecipient,
  TopTeam,
  TrendingCategory,
  TrendingKeyword,
} from "../entities/Analytics";

export type PeriodType = "weekly" | "monthly" | "yearly";

export interface AnalyticsParams {
  period: PeriodType;
  limit: number;
}

/**
 * Interface for the Analytics Repository
 * Provides methods to fetch analytics data from the API
 */
export interface IAnalyticsRepository {
  /**
   * Get the top recipients based on kudos received
   * @param params Query parameters for period and limit
   * @returns Promise with array of top recipients
   */
  getTopRecipients(params: AnalyticsParams): Promise<TopRecipient[]>;

  /**
   * Get the top teams based on kudos received
   * @param params Query parameters for period and limit
   * @returns Promise with array of top teams
   */
  getTopTeams(params: AnalyticsParams): Promise<TopTeam[]>;

  /**
   * Get trending categories
   * @param params Query parameters for period and limit
   * @returns Promise with array of trending categories
   */
  getTrendingCategories(params: AnalyticsParams): Promise<TrendingCategory[]>;

  /**
   * Get trending keywords
   * @param params Query parameters for period and limit
   * @returns Promise with array of trending keywords
   */
  getTrendingKeywords(params: AnalyticsParams): Promise<TrendingKeyword[]>;
}
