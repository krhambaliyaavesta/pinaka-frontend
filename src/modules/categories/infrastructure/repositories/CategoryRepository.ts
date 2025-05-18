import { Category } from "../../domain/entities/Category";
import { ICategoryRepository } from "../../domain/interfaces/ICategoryRepository";
import { HttpClient } from "@/core/infrastructure/http/HttpClient";
import { HttpClientProvider } from "@/core/infrastructure/di/HttpClientProvider";

export class CategoryRepository implements ICategoryRepository {
  private httpClient: HttpClient;

  constructor() {
    // Use the existing HttpClientProvider from core infrastructure
    const provider = HttpClientProvider.getInstance();
    this.httpClient = provider.getClient(process.env.NEXT_PUBLIC_API_URL || "");
  }

  async getCategories(): Promise<Category[]> {
    try {
      const response = await this.httpClient.get<any>("/api/categories");

      return response.data.map(
        (category: any) =>
          new Category(
            category.id,
            category.name,
            category.createdAt,
            category.updatedAt
          )
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  async createCategory(name: string): Promise<Category> {
    try {
      const response = await this.httpClient.post<any>("/api/categories", {
        name,
      });

      return new Category(
        response.data.id,
        response.data.name,
        response.data.createdAt,
        response.data.updatedAt
      );
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }

  async deleteCategory(categoryId: number): Promise<void> {
    try {
      await this.httpClient.delete<any>(`/api/categories/${categoryId}`);
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }

  async updateCategory(categoryId: number, name: string): Promise<Category> {
    try {
      const response = await this.httpClient.put<any>(
        `/api/categories/${categoryId}`,
        { name }
      );

      return new Category(
        response.data.id,
        response.data.name,
        response.data.createdAt,
        response.data.updatedAt
      );
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  }
}
