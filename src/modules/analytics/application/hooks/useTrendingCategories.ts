"use client";

import { useState, useEffect } from "react";
import {
  AnalyticsModule,
  TrendingCategory,
  PeriodType,
} from "../../../analytics";

interface UseTrendingCategoriesProps {
  /**
   * Default period type
   * @default "monthly"
   */
  defaultPeriod?: PeriodType;

  /**
   * Default limit for results
   * @default 5
   */
  defaultLimit?: number;

  /**
   * Whether to fetch data immediately
   * @default true
   */
  fetchOnMount?: boolean;
}

/**
 * Hook for fetching trending categories data
 */
export function useTrendingCategories({
  defaultPeriod = "monthly",
  defaultLimit = 5,
  fetchOnMount = true,
}: UseTrendingCategoriesProps = {}) {
  const [period, setPeriod] = useState<PeriodType>(defaultPeriod);
  const [limit, setLimit] = useState<number>(defaultLimit);
  const [data, setData] = useState<TrendingCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(fetchOnMount);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Fetch trending categories data
   */
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const useCase = AnalyticsModule.getTrendingCategoriesUseCase();
      const result = await useCase.execute({ period, limit });

      setData(result);
    } catch (err) {
      console.error("Error fetching trending categories:", err);
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch trending categories")
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
