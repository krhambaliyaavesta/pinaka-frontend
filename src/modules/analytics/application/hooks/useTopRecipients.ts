"use client";

import { useState, useEffect } from "react";
import { AnalyticsModule, TopRecipient, PeriodType } from "../../../analytics";

interface UseTopRecipientsProps {
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
 * Hook for fetching top recipients data
 */
export function useTopRecipients({
  defaultPeriod = "monthly",
  defaultLimit = 5,
  fetchOnMount = true,
}: UseTopRecipientsProps = {}) {
  const [period, setPeriod] = useState<PeriodType>(defaultPeriod);
  const [limit, setLimit] = useState<number>(defaultLimit);
  const [data, setData] = useState<TopRecipient[]>([]);
  const [loading, setLoading] = useState<boolean>(fetchOnMount);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Fetch top recipients data
   */
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const useCase = AnalyticsModule.getTopRecipientsUseCase();
      const result = await useCase.execute({ period, limit });

      setData(result);
    } catch (err) {
      console.error("Error fetching top recipients:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to fetch top recipients")
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
