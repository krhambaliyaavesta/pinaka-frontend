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
    // Map category names to KudosCardType
    const typeMap: Record<string, KudosCardType["type"]> = {
      "Innovation": "codeQuality",
      "Helping Hand": "support",
      "Problem Solving": "problemSolving",
      "Leadership": "guidingLight",
      "Customer Focus": "aboveAndBeyond",
      "Teamwork": "teamwork",
      "Quality Work": "codeQuality",
    };


    return {
      id: card.id,
      type: typeMap[card.categoryName] || "thankYou", // Default to thankYou if mapping not found
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
