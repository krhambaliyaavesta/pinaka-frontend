import { Card } from "../../domain/entities/Card";
import { ICardRepository } from "../../domain/interfaces/ICardRepository";
import { ICardService } from "../../domain/interfaces/ICardService";

export class CardService implements ICardService {
  constructor(private readonly cardRepository: ICardRepository) {}

  async getCards(): Promise<Card[]> {
    try {
      return await this.cardRepository.getCards();
    } catch (error) {
      console.error('Error in CardService.getCards:', error);
      throw error;
    }
  }

  async getCardById(id: string): Promise<Card> {
    try {
      return await this.cardRepository.getCardById(id);
    } catch (error) {
      console.error(`Error in CardService.getCardById for id ${id}:`, error);
      throw error;
    }
  }

  async createCard(card: {
    recipientName: string;
    teamId: number;
    categoryId: number;
    message: string;
  }): Promise<Card> {
    try {
      return await this.cardRepository.createCard(card);
    } catch (error) {
      console.error('Error in CardService.createCard:', error);
      throw error;
    }
  }

  async updateCard(id: string, card: {
    recipientName?: string;
    teamId?: number;
    categoryId?: number;
    message?: string;
  }): Promise<Card> {
    try {
      return await this.cardRepository.updateCard(id, card);
    } catch (error) {
      console.error(`Error in CardService.updateCard for id ${id}:`, error);
      throw error;
    }
  }

  async deleteCard(id: string): Promise<void> {
    try {
      return await this.cardRepository.deleteCard(id);
    } catch (error) {
      console.error(`Error in CardService.deleteCard for id ${id}:`, error);
      throw error;
    }
  }
} 