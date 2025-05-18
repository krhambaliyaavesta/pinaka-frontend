import { Card } from "../../domain/entities/Card";
import { ICardService } from "../../domain/interfaces/ICardService";

export class GetCardsUseCase {
  constructor(private readonly cardService: ICardService) {}

  async execute(): Promise<Card[]> {
    return this.cardService.getCards();
  }
} 