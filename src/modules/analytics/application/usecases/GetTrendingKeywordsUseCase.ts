import { IAnalyticsService } from "../../domain/interfaces/IAnalyticsService";
import { AnalyticsParams } from "../../domain/interfaces/IAnalyticsRepository";
import { TrendingKeyword } from "../../domain/entities/Analytics";

/**
 * Use case for fetching trending keywords
 */
export class GetTrendingKeywordsUseCase {
  private service: IAnalyticsService;

  /**
   * Create a new GetTrendingKeywordsUseCase
   * @param service The analytics service
   */
  constructor(service: IAnalyticsService) {
    this.service = service;
  }

  /**
   * Execute the use case
   * @param params Query parameters for the request
   * @returns Promise with the trending keywords data
   */
  async execute(params: AnalyticsParams): Promise<TrendingKeyword[]> {
    return this.service.getTrendingKeywords(params);
  }
}
