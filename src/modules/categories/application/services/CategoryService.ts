import { Category } from "../../domain/entities/Category";
import { ICategoryRepository } from "../../domain/interfaces/ICategoryRepository";
import { ICategoryService } from "../../domain/interfaces/ICategoryService";

export class CategoryService implements ICategoryService {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async getCategories(): Promise<Category[]> {
    try {
      return await this.categoryRepository.getCategories();
    } catch (error) {
      console.error('Error in CategoryService.getCategories:', error);
      throw error;
    }
  }

  async createCategory(name: string): Promise<Category> {
    try {
      return await this.categoryRepository.createCategory(name);
    } catch (error) {
      console.error('Error in CategoryService.createCategory:', error);
      throw error;
    }
  }

  async deleteCategory(categoryId: number): Promise<void> {
    try {
      return await this.categoryRepository.deleteCategory(categoryId);
    } catch (error) {
      console.error('Error in CategoryService.deleteCategory:', error);
      throw error;
    }
  }

  async updateCategory(categoryId: number, name: string): Promise<Category> {
    try {
      return await this.categoryRepository.updateCategory(categoryId, name);
    } catch (error) {
      console.error('Error in CategoryService.updateCategory:', error);
      throw error;
    }
  }
} 