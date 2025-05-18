import { AnalyticsRepository } from "./infrastructure/repositories/AnalyticsRepository";
import { AnalyticsService } from "./application/services/AnalyticsService";
import { GetTopRecipientsUseCase } from "./application/usecases/GetTopRecipientsUseCase";
import { GetTopTeamsUseCase } from "./application/usecases/GetTopTeamsUseCase";
import { GetTrendingCategoriesUseCase } from "./application/usecases/GetTrendingCategoriesUseCase";
import { GetTrendingKeywordsUseCase } from "./application/usecases/GetTrendingKeywordsUseCase";
import { IAnalyticsRepository } from "./domain/interfaces/IAnalyticsRepository";
import { IAnalyticsService } from "./domain/interfaces/IAnalyticsService";

/**
 * Analytics Module Factory
 *
 * This module factory provides centralized access to analytics-related
 * repositories, services and use cases with proper dependency injection.
 */
export class AnalyticsModule {
  private static repository: IAnalyticsRepository;
  private static service: IAnalyticsService;

  /**
   * Gets or creates an instance of the analytics repository
   * @returns The analytics repository instance
   */
  static getAnalyticsRepository(): IAnalyticsRepository {
    if (!this.repository) {
      this.repository = new AnalyticsRepository();
    }
    return this.repository;
  }

  /**
   * Gets or creates an instance of the analytics service
   * @returns The analytics service instance
   */
  static getAnalyticsService(): IAnalyticsService {
    if (!this.service) {
      this.service = new AnalyticsService(this.getAnalyticsRepository());
    }
    return this.service;
  }

  /**
   * Creates a new use case for fetching top recipients
   * @returns A GetTopRecipientsUseCase instance
   */
  static getTopRecipientsUseCase(): GetTopRecipientsUseCase {
    return new GetTopRecipientsUseCase(this.getAnalyticsService());
  }

  /**
   * Creates a new use case for fetching top teams
   * @returns A GetTopTeamsUseCase instance
   */
  static getTopTeamsUseCase(): GetTopTeamsUseCase {
    return new GetTopTeamsUseCase(this.getAnalyticsService());
  }

  /**
   * Creates a new use case for fetching trending categories
   * @returns A GetTrendingCategoriesUseCase instance
   */
  static getTrendingCategoriesUseCase(): GetTrendingCategoriesUseCase {
    return new GetTrendingCategoriesUseCase(this.getAnalyticsService());
  }

  /**
   * Creates a new use case for fetching trending keywords
   * @returns A GetTrendingKeywordsUseCase instance
   */
  static getTrendingKeywordsUseCase(): GetTrendingKeywordsUseCase {
    return new GetTrendingKeywordsUseCase(this.getAnalyticsService());
  }

  /**
   * Handles analytics errors consistently
   * @param error The error to handle
   * @returns A user-friendly error response
   */
  static handleError(error: unknown): Error {
    console.error("Analytics error:", error);
    return new Error("An error occurred while fetching analytics data");
  }

  /**
   * Resets all singleton instances
   * This is primarily used for testing purposes
   */
  static reset(): void {
    this.repository = undefined as unknown as IAnalyticsRepository;
    this.service = undefined as unknown as IAnalyticsService;
  }
}
