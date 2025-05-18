import { ICategoryService } from "../../domain/interfaces/ICategoryService";

export class DeleteCategoryUseCase {
  constructor(private readonly categoryService: ICategoryService) {}

  async execute(categoryId: number): Promise<void> {
    return this.categoryService.deleteCategory(categoryId);
  }
} 