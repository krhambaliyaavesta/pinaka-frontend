import { useState, useEffect } from "react";
import { Card } from "../../domain/entities/Card";
import { CardsModule } from "../..";

export function useCards() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const getCardsUseCase = CardsModule.createGetCardsUseCase();
        const fetchedCards = await getCardsUseCase.execute();
        setCards(fetchedCards);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch cards"));
        CardsModule.logError(err, "useCards hook");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return { cards, loading, error };
} 