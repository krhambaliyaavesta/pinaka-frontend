"use client";

import { useState, useEffect } from "react";
import {
  AnalyticsModule,
  TrendingKeyword,
  PeriodType,
} from "../../../analytics";

interface UseTrendingKeywordsProps {
  /**
   * Default period type
   * @default "monthly"
   */
  defaultPeriod?: PeriodType;

  /**
   * Default limit for results
   * @default 10
   */
  defaultLimit?: number;

  /**
   * Whether to fetch data immediately
   * @default true
   */
  fetchOnMount?: boolean;
}

/**
 * Hook for fetching trending keywords data
 */
export function useTrendingKeywords({
  defaultPeriod = "monthly",
  defaultLimit = 10,
  fetchOnMount = true,
}: UseTrendingKeywordsProps = {}) {
  const [period, setPeriod] = useState<PeriodType>(defaultPeriod);
  const [limit, setLimit] = useState<number>(defaultLimit);
  const [data, setData] = useState<TrendingKeyword[]>([]);
  const [loading, setLoading] = useState<boolean>(fetchOnMount);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Fetch trending keywords data
   */
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const useCase = AnalyticsModule.getTrendingKeywordsUseCase();
      const result = await useCase.execute({ period, limit });

      setData(result);
    } catch (err) {
      console.error("Error fetching trending keywords:", err);
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch trending keywords")
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update the period and refetch data
   */
  const updatePeriod = (newPeriod: PeriodType) => {
    setPeriod(newPeriod);
  };

  /**
   * Update the limit and refetch data
   */
  const updateLimit = (newLimit: number) => {
    setLimit(newLimit);
  };

  useEffect(() => {
    if (fetchOnMount) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [period, limit]);

  return {
    data,
    loading,
    error,
    period,
    limit,
    updatePeriod,
    updateLimit,
    refresh: fetchData,
  };
}
