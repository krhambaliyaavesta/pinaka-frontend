import { Card } from "../../domain/entities/Card";
import { ICardService } from "../../domain/interfaces/ICardService";

export class CreateCardUseCase {
  constructor(private readonly cardService: ICardService) {}

  async execute(
    recipientName: string,
    teamId: number,
    categoryId: number,
    message: string
  ): Promise<Card> {
    return this.cardService.createCard({
      recipientName,
      teamId,
      categoryId,
      message,
    });
  }
} 