/**
 * Entity representing a top recipient
 */
export interface TopRecipient {
  recipientName: string;
  count: number;
}

/**
 * Entity representing a top team
 */
export interface TopTeam {
  teamId: number;
  teamName: string;
  count: number;
}

/**
 * Entity representing a trending category
 */
export interface TrendingCategory {
  categoryId: number;
  categoryName: string;
  count: number;
}

/**
 * Entity representing a trending keyword
 */
export interface TrendingKeyword {
  keyword: string;
  count: number;
}

/**
 * Response structure for analytics API calls
 */
export interface AnalyticsResponse<T> {
  status: string;
  data: T[];
}
