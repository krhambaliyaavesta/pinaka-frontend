// Module Factory
export { AnalyticsModule } from "./AnalyticsModule";

// Domain Entities
export type {
  TopRecipient,
  TopTeam,
  TrendingCategory,
  TrendingKeyword,
  AnalyticsResponse,
} from "./domain/entities/Analytics";

// Repository Interfaces and Types
export type {
  IAnalyticsRepository,
  AnalyticsParams,
  PeriodType,
} from "./domain/interfaces/IAnalyticsRepository";

// Service Interfaces
export type { IAnalyticsService } from "./domain/interfaces/IAnalyticsService";

// Use Cases
export { GetTopRecipientsUseCase } from "./application/usecases/GetTopRecipientsUseCase";
export { GetTopTeamsUseCase } from "./application/usecases/GetTopTeamsUseCase";
export { GetTrendingCategoriesUseCase } from "./application/usecases/GetTrendingCategoriesUseCase";
export { GetTrendingKeywordsUseCase } from "./application/usecases/GetTrendingKeywordsUseCase";

// Hooks
export {
  useTopRecipients,
  useTopTeams,
  useTrendingCategories,
  useTrendingKeywords,
} from "./application/hooks";
