import { Card } from "../../domain/entities/Card";
import { ICardService } from "../../domain/interfaces/ICardService";

export class GetCardByIdUseCase {
  constructor(private readonly cardService: ICardService) {}

  async execute(id: string): Promise<Card> {
    return this.cardService.getCardById(id);
  }
} 