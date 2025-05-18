import { ICardService } from "../../domain/interfaces/ICardService";

export class DeleteCardUseCase {
  constructor(private readonly cardService: ICardService) {}

  async execute(id: string): Promise<void> {
    return this.cardService.deleteCard(id);
  }
} 