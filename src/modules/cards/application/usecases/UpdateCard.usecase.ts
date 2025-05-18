import { Card } from "../../domain/entities/Card";
import { ICardService } from "../../domain/interfaces/ICardService";

export class UpdateCardUseCase {
  constructor(private readonly cardService: ICardService) {}

  async execute(
    id: string,
    data: {
      recipientName?: string;
      teamId?: number;
      categoryId?: number;
      message?: string;
    }
  ): Promise<Card> {
    return this.cardService.updateCard(id, data);
  }
} 