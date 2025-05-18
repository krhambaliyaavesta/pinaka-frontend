import { Category } from "../../domain/entities/Category";
import { ICategoryService } from "../../domain/interfaces/ICategoryService";

export class GetCategoriesUseCase {
  constructor(private readonly categoryService: ICategoryService) {}

  async execute(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }
} 