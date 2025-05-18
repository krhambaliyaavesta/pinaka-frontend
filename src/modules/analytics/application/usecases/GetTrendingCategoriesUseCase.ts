import { IAnalyticsService } from "../../domain/interfaces/IAnalyticsService";
import { AnalyticsParams } from "../../domain/interfaces/IAnalyticsRepository";
import { TrendingCategory } from "../../domain/entities/Analytics";

/**
 * Use case for fetching trending categories
 */
export class GetTrendingCategoriesUseCase {
  private service: IAnalyticsService;

  /**
   * Create a new GetTrendingCategoriesUseCase
   * @param service The analytics service
   */
  constructor(service: IAnalyticsService) {
    this.service = service;
  }

  /**
   * Execute the use case
   * @param params Query parameters for the request
   * @returns Promise with the trending categories data
   */
  async execute(params: AnalyticsParams): Promise<TrendingCategory[]> {
    return this.service.getTrendingCategories(params);
  }
}
