import { Category } from "../entities/Category";

export interface ICategoryService {
  getCategories(): Promise<Category[]>;
  createCategory(name: string): Promise<Category>;
  deleteCategory(categoryId: number): Promise<void>;
  updateCategory(categoryId: number, name: string): Promise<Category>;
} 