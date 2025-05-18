import { Category } from "../../domain/entities/Category";
import { ICategoryService } from "../../domain/interfaces/ICategoryService";

export class CreateCategoryUseCase {
  constructor(private readonly categoryService: ICategoryService) {}

  async execute(name: string): Promise<Category> {
    return this.categoryService.createCategory(name);
  }
} 