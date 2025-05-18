import { Card } from "../../domain/entities/Card";
import { KudosCardType } from "@/presentation/molecules/common/KudosCard/KudosCard";

/**
 * Adapter for converting domain Card entities to presentation KudosCardType
 */
export class CardAdapter {
  /**
   * Maps a Card domain entity to a KudosCardType presentation model
   */
  static toKudosCard(card: Card): KudosCardType {
    // Map categoryId to type (assuming a mapping exists)
    const typeMap: Record<number, KudosCardType["type"]> = {
      1: "thankYou",
      2: "greatJob",
      3: "teamwork",
      4: "support",
      5: "problemSolving",
      6: "guidingLight",
      7: "codeQuality",
      8: "aboveAndBeyond",
    };

    return {
      id: card.id,
      type: typeMap[card.categoryId] || "thankYou", // Default to thankYou if mapping not found
      title: card.categoryName,
      description: card.message,
      memberName: card.recipientName,
      leadershipNote: `Awarded by ${card.creatorName}`,
    };
  }

  /**
   * Maps an array of Card domain entities to KudosCardType presentation models
   */
  static toKudosCards(cards: Card[]): KudosCardType[] {
    return cards.map((card) => this.toKudosCard(card));
  }
}
