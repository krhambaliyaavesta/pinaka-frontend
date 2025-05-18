import { useState, useEffect } from "react";
import { KudosCardType } from "@/presentation/molecules/common/KudosCard/KudosCard";
import { CardsModule } from "../../CardsModule";
import { CardAdapter } from "../adapters/CardAdapter";

interface UseKudosCardsResult {
  cards: KudosCardType[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

/**
 * Hook for fetching kudos cards from the API
 * @returns Object containing cards, loading state, error state, and refresh function
 */
export function useKudosCards(): UseKudosCardsResult {
  const [cards, setCards] = useState<KudosCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const getCardsUseCase = CardsModule.createGetCardsUseCase();
      const domainCards = await getCardsUseCase.execute();


      // Transform domain cards to presentation cards
      const kudosCards = CardAdapter.toKudosCards(domainCards);

      setCards(kudosCards);
      setError(null);
    } catch (err) {
      console.error("Error fetching kudos cards:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to fetch kudos cards")
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch cards on component mount
  useEffect(() => {
    fetchCards();
  }, []);

  // Function to manually refresh cards
  const refresh = async () => {
    await fetchCards();
  };

  return { cards, loading, error, refresh };
}
