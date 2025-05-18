import { useState, useEffect } from "react";
import { Category } from "../../domain/entities/Category";
import { CategoriesModule } from "../..";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const getCategoriesUseCase = CategoriesModule.createGetCategoriesUseCase();
        const fetchedCategories = await getCategoriesUseCase.execute();
        setCategories(fetchedCategories);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch categories"));
        CategoriesModule.logError(err, "useCategories hook");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
} 