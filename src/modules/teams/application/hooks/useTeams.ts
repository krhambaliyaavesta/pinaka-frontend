import { useState, useEffect } from "react";
import { Team } from "../../domain/entities/Team";
import { TeamsModule } from "../..";

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const getTeamsUseCase = TeamsModule.createGetTeamsUseCase();
        const fetchedTeams = await getTeamsUseCase.execute();
        setTeams(fetchedTeams);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch teams"));
        TeamsModule.logError(err, "useTeams hook");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return { teams, loading, error };
} 