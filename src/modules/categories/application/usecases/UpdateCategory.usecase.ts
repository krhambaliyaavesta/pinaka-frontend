import { Category } from "../../domain/entities/Category";
import { ICategoryService } from "../../domain/interfaces/ICategoryService";

export class UpdateCategoryUseCase {
  constructor(private readonly categoryService: ICategoryService) {}

  async execute(categoryId: number, name: string): Promise<Category> {
    return this.categoryService.updateCategory(categoryId, name);
  }
} 