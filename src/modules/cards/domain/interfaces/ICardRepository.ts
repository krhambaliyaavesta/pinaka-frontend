import { Card } from "../entities/Card";

export interface ICardRepository {
  getCards(): Promise<Card[]>;
  getCardById(id: string): Promise<Card>;
  createCard(card: {
    recipientName: string;
    teamId: number;
    categoryId: number;
    message: string;
  }): Promise<Card>;
  updateCard(id: string, card: {
    recipientName?: string;
    teamId?: number;
    categoryId?: number;
    message?: string;
  }): Promise<Card>;
  deleteCard(id: string): Promise<void>;
} 