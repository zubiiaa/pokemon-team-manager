import { useState, useEffect } from 'react';
import { Pokemon, PokemonTeam } from '@/types/pokemon';
import { addPokemonToTeam, removePokemonFromTeam } from '@/utils/teamUtils';

const TEAM_STORAGE_KEY = 'pokemon-team';

export const useTeam = () => {
  const [team, setTeam] = useState<PokemonTeam>({ pokemon: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedTeam = localStorage.getItem(TEAM_STORAGE_KEY);
    if (savedTeam) {
      try {
        setTeam(JSON.parse(savedTeam));
      } catch (error) {
        console.error('Error loading team from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(team));
  }, [team]);

  const addPokemon = (pokemon: Pokemon): boolean => {
    const newTeam = addPokemonToTeam(team, pokemon);
    if (newTeam) {
      setTeam(newTeam);
      return true;
    }
    return false;
  };

  const removePokemon = (pokemonId: number) => {
    const newTeam = removePokemonFromTeam(team, pokemonId);
    setTeam(newTeam);
  };

  const clearTeam = () => {
    setTeam({ pokemon: [] });
  };

  const isTeamFull = team.pokemon.length >= 6;
  const isPokemonInTeam = (pokemonId: number) => team.pokemon.some(p => p.id === pokemonId);

  return {
    team,
    addPokemon,
    removePokemon,
    clearTeam,
    isTeamFull,
    isPokemonInTeam,
    isLoading,
    setIsLoading
  };
}; 