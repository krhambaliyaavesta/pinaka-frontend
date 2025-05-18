import { useState, useCallback } from "react";
import { User } from "@/modules/auth/domain/entities/User";
import { UserSearchParams } from "../../domain/types";
import { UserManagementModule } from "../../UserManagementModule";

interface UseSearchUsersResult {
  users: User[];
  total: number;
  loading: boolean;
  error: Error | null;
  search: (params: UserSearchParams) => Promise<void>;
  nextPage: () => Promise<void>;
  previousPage: () => Promise<void>;
  currentPage: number;
  pageSize: number;
  setPageSize: (size: number) => void;
}

/**
 * Hook for searching users with pagination
 * @param initialParams Initial search parameters (optional)
 * @returns Object containing users, loading state, error state, and search functions
 */
export function useSearchUsers(
  initialParams?: Partial<UserSearchParams>
): UseSearchUsersResult {
  const defaultParams: UserSearchParams = {
    limit: 10,
    offset: 0,
    ...(initialParams || {}),
  };

  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchParams, setSearchParams] =
    useState<UserSearchParams>(defaultParams);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(defaultParams.limit);

  const search = useCallback(async (params: UserSearchParams) => {
    try {
      setLoading(true);
      setError(null);

      // Get the use case from the module
      const searchUsersUseCase = UserManagementModule.getSearchUsersUseCase();

      // Execute the use case
      const result = await searchUsersUseCase.execute(params);

      // Update state with the results
      setUsers(result.users);
      setTotal(result.total);
      setSearchParams(params);

      // Calculate current page based on offset and limit
      const newPage = Math.floor(params.offset / params.limit) + 1;
      setCurrentPage(newPage);
      setPageSize(params.limit);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to search users")
      );
      console.error("Error searching users:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const nextPage = useCallback(async () => {
    const maxPage = Math.ceil(total / pageSize);
    if (currentPage < maxPage) {
      const newOffset = searchParams.offset + pageSize;
      await search({
        ...searchParams,
        offset: newOffset,
      });
    }
  }, [currentPage, pageSize, search, searchParams, total]);

  const previousPage = useCallback(async () => {
    if (currentPage > 1) {
      const newOffset = Math.max(0, searchParams.offset - pageSize);
      await search({
        ...searchParams,
        offset: newOffset,
      });
    }
  }, [currentPage, pageSize, search, searchParams]);

  const handleSetPageSize = useCallback(
    (size: number) => {
      search({
        ...searchParams,
        limit: size,
        offset: 0, // Reset to first page when changing page size
      });
    },
    [search, searchParams]
  );

  return {
    users,
    total,
    loading,
    error,
    search,
    nextPage,
    previousPage,
    currentPage,
    pageSize,
    setPageSize: handleSetPageSize,
  };
}
