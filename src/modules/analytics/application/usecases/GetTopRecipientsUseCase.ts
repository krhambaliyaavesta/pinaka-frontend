import { IAnalyticsService } from "../../domain/interfaces/IAnalyticsService";
import { AnalyticsParams } from "../../domain/interfaces/IAnalyticsRepository";
import { TopRecipient } from "../../domain/entities/Analytics";

/**
 * Use case for fetching top recipients
 */
export class GetTopRecipientsUseCase {
  private service: IAnalyticsService;

  /**
   * Create a new GetTopRecipientsUseCase
   * @param service The analytics service
   */
  constructor(service: IAnalyticsService) {
    this.service = service;
  }

  /**
   * Execute the use case
   * @param params Query parameters for the request
   * @returns Promise with the top recipients data
   */
  async execute(params: AnalyticsParams): Promise<TopRecipient[]> {
    return this.service.getTopRecipients(params);
  }
}
