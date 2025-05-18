import { Category } from "../entities/Category";

export interface ICategoryRepository {
  getCategories(): Promise<Category[]>;
  createCategory(name: string): Promise<Category>;
  deleteCategory(categoryId: number): Promise<void>;
  updateCategory(categoryId: number, name: string): Promise<Category>;
} 