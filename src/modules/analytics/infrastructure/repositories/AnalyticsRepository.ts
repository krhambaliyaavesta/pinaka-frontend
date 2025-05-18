import {
  IAnalyticsRepository,
  AnalyticsParams,
} from "../../domain/interfaces/IAnalyticsRepository";
import {
  TopRecipient,
  TopTeam,
  TrendingCategory,
  TrendingKeyword,
  AnalyticsResponse,
} from "../../domain/entities/Analytics";
import { HttpClientProvider } from "@/core/infrastructure/di/HttpClientProvider";
import { HttpClient } from "@/core/infrastructure/http/HttpClient";

/**
 * Implementation of the Analytics Repository
 * Handles API requests to fetch analytics data
 */
export class AnalyticsRepository implements IAnalyticsRepository {
  private baseUrl: string;
  private httpClient: HttpClient;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

    // Get HTTP client from provider with auth token enabled
    const provider = HttpClientProvider.getInstance();
    this.httpClient = provider.getClient(this.baseUrl, {
      enableErrorHandling: true,
      enableAuthToken: true,
    });
  }

  /**
   * Get the top recipients based on kudos received
   * @param params Query parameters for period and limit
   * @returns Promise with array of top recipients
   */
  async getTopRecipients(params: AnalyticsParams): Promise<TopRecipient[]> {
    try {
      const queryParams = {
        period: params.period,
        limit: params.limit,
      };

      const response = await this.httpClient.get<
        AnalyticsResponse<TopRecipient>
      >(`/api/analytics/top-recipients`, { params: queryParams });

      return response.data || [];
    } catch (error) {
      console.error("Error fetching top recipients:", error);
      throw error;
    }
  }

  /**
   * Get the top teams based on kudos received
   * @param params Query parameters for period and limit
   * @returns Promise with array of top teams
   */
  async getTopTeams(params: AnalyticsParams): Promise<TopTeam[]> {
    try {
      const queryParams = {
        period: params.period,
        limit: params.limit,
      };

      const response = await this.httpClient.get<AnalyticsResponse<TopTeam>>(
        `/api/analytics/top-teams`,
        { params: queryParams }
      );

      return response.data || [];
    } catch (error) {
      console.error("Error fetching top teams:", error);
      throw error;
    }
  }

  /**
   * Get trending categories
   * @param params Query parameters for period and limit
   * @returns Promise with array of trending categories
   */
  async getTrendingCategories(
    params: AnalyticsParams
  ): Promise<TrendingCategory[]> {
    try {
      const queryParams = {
        period: params.period,
        limit: params.limit,
      };

      const response = await this.httpClient.get<
        AnalyticsResponse<TrendingCategory>
      >(`/api/analytics/trending-categories`, {
        params: queryParams,
      });

      return response.data || [];
    } catch (error) {
      console.error("Error fetching trending categories:", error);
      throw error;
    }
  }

  /**
   * Get trending keywords
   * @param params Query parameters for period and limit
   * @returns Promise with array of trending keywords
   */
  async getTrendingKeywords(
    params: AnalyticsParams
  ): Promise<TrendingKeyword[]> {
    try {
      const queryParams = {
        period: params.period,
        limit: params.limit,
      };

      const response = await this.httpClient.get<
        AnalyticsResponse<TrendingKeyword>
      >(`/api/analytics/trending-keywords`, {
        params: queryParams,
      });

      return response.data || [];
    } catch (error) {
      console.error("Error fetching trending keywords:", error);
      throw error;
    }
  }
}
