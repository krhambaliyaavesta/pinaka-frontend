import { HttpClient } from "@/core/infrastructure/http/HttpClient";
import { HttpClientProvider } from "@/core/infrastructure/di/HttpClientProvider";
import { Card } from "../../domain/entities/Card";
import { ICardRepository } from "../../domain/interfaces/ICardRepository";

export class CardRepository implements ICardRepository {
  private httpClient: HttpClient;

  constructor() {
    // Use the existing HttpClientProvider from core infrastructure
    const provider = HttpClientProvider.getInstance();
    this.httpClient = provider.getClient(
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
      { enableErrorHandling: true }
    );
  }

  async getCards(): Promise<Card[]> {
    try {
      const response = await this.httpClient.get<any>('/api/kudos-cards');
      
      return response.data.map((card: any) => new Card(
        card.id,
        card.recipientName,
        card.teamId,
        card.teamName,
        card.categoryId,
        card.categoryName,
        card.message,
        card.createdBy,
        card.creatorName,
        card.createdAt,
        card.updatedAt
      ));
    } catch (error) {
      console.error('Error fetching cards:', error);
      throw error;
    }
  }

  async getCardById(id: string): Promise<Card> {
    try {
      const response = await this.httpClient.get<any>(`/api/kudos-cards/${id}`);
      const card = response.data;
      
      return new Card(
        card.id,
        card.recipientName,
        card.teamId,
        card.teamName,
        card.categoryId,
        card.categoryName,
        card.message,
        card.createdBy,
        card.creatorName,
        card.createdAt,
        card.updatedAt
      );
    } catch (error) {
      console.error(`Error fetching card with id ${id}:`, error);
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
      const response = await this.httpClient.post<any>('/api/kudos-cards', card);
      const createdCard = response.data;
      
      return new Card(
        createdCard.id,
        createdCard.recipientName,
        createdCard.teamId,
        createdCard.teamName,
        createdCard.categoryId,
        createdCard.categoryName,
        createdCard.message,
        createdCard.createdBy,
        createdCard.creatorName,
        createdCard.createdAt,
        createdCard.updatedAt
      );
    } catch (error) {
      console.error('Error creating card:', error);
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
      const response = await this.httpClient.put<any>(`/api/kudos-cards/${id}`, card);
      const updatedCard = response.data;
      
      return new Card(
        updatedCard.id,
        updatedCard.recipientName,
        updatedCard.teamId,
        updatedCard.teamName,
        updatedCard.categoryId,
        updatedCard.categoryName,
        updatedCard.message,
        updatedCard.createdBy,
        updatedCard.creatorName,
        updatedCard.createdAt,
        updatedCard.updatedAt
      );
    } catch (error) {
      console.error(`Error updating card with id ${id}:`, error);
      throw error;
    }
  }

  async deleteCard(id: string): Promise<void> {
    try {
      await this.httpClient.delete<void>(`/api/kudos-cards/${id}`);
    } catch (error) {
      console.error(`Error deleting card with id ${id}:`, error);
      throw error;
    }
  }
} 