import { CategoryRepository } from "./infrastructure/repositories/CategoryRepository";
import { CategoryService } from "./application/services/CategoryService";
import { GetCategoriesUseCase } from "./application/usecases/GetCategories.usecase";
import { CreateCategoryUseCase } from "./application/usecases/CreateCategory.usecase";
import { DeleteCategoryUseCase } from "./application/usecases/DeleteCategory.usecase";
import { UpdateCategoryUseCase } from "./application/usecases/UpdateCategory.usecase";
import { ICategoryRepository } from "./domain/interfaces/ICategoryRepository";
import { ICategoryService } from "./domain/interfaces/ICategoryService";

/**
 * Factory class for the Categories module
 * Handles dependency injection and creates instances of repositories, services, and use cases
 */
export class CategoriesModule {
  private static repository: ICategoryRepository | null = null;
  private static service: ICategoryService | null = null;

  /**
   * Get the category repository instance (singleton)
   */
  static getRepository(): ICategoryRepository {
    if (!this.repository) {
      this.repository = new CategoryRepository();
    }
    return this.repository;
  }

  /**
   * Get the category service instance (singleton)
   */
  static getService(): ICategoryService {
    if (!this.service) {
      this.service = new CategoryService(this.getRepository());
    }
    return this.service;
  }

  /**
   * Create a new GetCategoriesUseCase instance
   */
  static createGetCategoriesUseCase(): GetCategoriesUseCase {
    return new GetCategoriesUseCase(this.getService());
  }

  /**
   * Create a new CreateCategoryUseCase instance
   */
  static createCreateCategoryUseCase(): CreateCategoryUseCase {
    return new CreateCategoryUseCase(this.getService());
  }

  /**
   * Create a new DeleteCategoryUseCase instance
   */
  static createDeleteCategoryUseCase(): DeleteCategoryUseCase {
    return new DeleteCategoryUseCase(this.getService());
  }

  /**
   * Create a new UpdateCategoryUseCase instance
   */
  static createUpdateCategoryUseCase(): UpdateCategoryUseCase {
    return new UpdateCategoryUseCase(this.getService());
  }

  /**
   * Log category errors with context
   * @param error The error to log
   * @param context Additional context information
   */
  static logError(error: unknown, context?: string): void {
    console.error(`Categories Module Error${context ? ` [${context}]` : ''}:`, error);
  }

  /**
   * Reset all module instances (useful for testing)
   */
  static reset(): void {
    this.repository = null;
    this.service = null;
  }
} 