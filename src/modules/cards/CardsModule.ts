import { CardRepository } from "./infrastructure/repositories/CardRepository";
import { CardService } from "./application/services/CardService";
import { GetCardsUseCase } from "./application/usecases/GetCards.usecase";
import { GetCardByIdUseCase } from "./application/usecases/GetCardById.usecase";
import { CreateCardUseCase } from "./application/usecases/CreateCard.usecase";
import { UpdateCardUseCase } from "./application/usecases/UpdateCard.usecase";
import { DeleteCardUseCase } from "./application/usecases/DeleteCard.usecase";
import { ICardRepository } from "./domain/interfaces/ICardRepository";
import { ICardService } from "./domain/interfaces/ICardService";

/**
 * Factory class for the Cards module
 * Handles dependency injection and creates instances of repositories, services, and use cases
 */
export class CardsModule {
  private static repository: ICardRepository | null = null;
  private static service: ICardService | null = null;

  /**
   * Get the card repository instance (singleton)
   */
  static getRepository(): ICardRepository {
    if (!this.repository) {
      this.repository = new CardRepository();
    }
    return this.repository;
  }

  /**
   * Get the card service instance (singleton)
   */
  static getService(): ICardService {
    if (!this.service) {
      this.service = new CardService(this.getRepository());
    }
    return this.service;
  }

  /**
   * Create a GetCards use case
   */
  static createGetCardsUseCase(): GetCardsUseCase {
    return new GetCardsUseCase(this.getService());
  }

  /**
   * Create a GetCardById use case
   */
  static createGetCardByIdUseCase(): GetCardByIdUseCase {
    return new GetCardByIdUseCase(this.getService());
  }

  /**
   * Create a CreateCard use case
   */
  static createCreateCardUseCase(): CreateCardUseCase {
    return new CreateCardUseCase(this.getService());
  }

  /**
   * Create an UpdateCard use case
   */
  static createUpdateCardUseCase(): UpdateCardUseCase {
    return new UpdateCardUseCase(this.getService());
  }

  /**
   * Create a DeleteCard use case
   */
  static createDeleteCardUseCase(): DeleteCardUseCase {
    return new DeleteCardUseCase(this.getService());
  }

  /**
   * Logs an error with module-specific context
   */
  static logError(error: unknown, context: string): void {
    console.error(`Cards Module - ${context}:`, error);
  }
} 