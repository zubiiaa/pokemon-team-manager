import { Pokemon } from '@/types/pokemon';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export const searchPokemon = async (name: string): Promise<Pokemon | null> => {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${name.toLowerCase()}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null; 
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    throw error;
  }
};

export const getPokemonById = async (id: number): Promise<Pokemon> => {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokemon by ID:', error);
    throw error;
  }
};

export const getRandomPokemon = async (): Promise<Pokemon> => {
  const randomId = Math.floor(Math.random() * 898) + 1; // PokeAPI has 898 Pokemon, I googled
  return getPokemonById(randomId);
}; 