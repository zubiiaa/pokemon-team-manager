import { useState } from 'react';
import { Pokemon } from '@/types/pokemon';
import { searchPokemon } from '@/utils/pokemonApi';

export const usePokemonSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (name: string) => {
    if (!name.trim()) {
      setPokemon(null);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await searchPokemon(name);
      setPokemon(result);
      if (!result) {
        setError(`Pokémon "${name}" not found. Please try a different name.`);
      }
    } catch (err) {
      setError('Failed to search for Pokémon. Please try again.');
      setPokemon(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (name: string) => {
    setSearchTerm(name);
    search(name);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setPokemon(null);
    setError(null);
  };

  return {
    searchTerm,
    pokemon,
    isLoading,
    error,
    handleSearch,
    clearSearch
  };
}; 