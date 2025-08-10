import { Pokemon, PokemonTeam, TeamStats } from '@/types/pokemon';

export const addPokemonToTeam = (team: PokemonTeam, pokemon: Pokemon): PokemonTeam | null => {
  if (team.pokemon.length >= 6) {
    return null;
  }
  
  const isDuplicate = team.pokemon.some(p => p.id === pokemon.id);
  if (isDuplicate) {
    return null;
  }
  
  return {
    pokemon: [...team.pokemon, pokemon]
  };
};

export const removePokemonFromTeam = (team: PokemonTeam, pokemonId: number): PokemonTeam => {
  return {
    pokemon: team.pokemon.filter(p => p.id !== pokemonId)
  };
};

export const calculateTeamStats = (team: PokemonTeam): TeamStats => {
  if (team.pokemon.length === 0) {
    return {
      totalTypes: 0,
      averageBaseExperience: 0,
      typesCovered: []
    };
  }
  
  const allTypes = team.pokemon.flatMap(p => p.types.map(t => t.type.name));
  const uniqueTypes = Array.from(new Set(allTypes));
  
  const totalExperience = team.pokemon.reduce((sum, p) => sum + p.base_experience, 0);
  const averageExperience = Math.round(totalExperience / team.pokemon.length);
  
  return {
    totalTypes: uniqueTypes.length,
    averageBaseExperience: averageExperience,
    typesCovered: uniqueTypes.sort()
  };
};

export const getTypeColor = (typeName: string): string => {
  const typeColors: Record<string, string> = {
    fire: 'bg-types-fire text-white',
    water: 'bg-types-water text-white', 
    grass: 'bg-types-grass text-white',
    electric: 'bg-types-electric text-black',
    psychic: 'bg-types-psychic text-white',
    ice: 'bg-types-ice text-black',
    dragon: 'bg-types-dragon text-white',
    dark: 'bg-types-dark text-white',
    fairy: 'bg-types-fairy text-black',
    fighting: 'bg-types-fighting text-white',
    poison: 'bg-types-poison text-white',
    ground: 'bg-types-ground text-white',
    flying: 'bg-types-flying text-black',
    bug: 'bg-types-bug text-white',
    rock: 'bg-types-rock text-white',
    ghost: 'bg-types-ghost text-white',
    steel: 'bg-types-steel text-white',
    normal: 'bg-types-normal text-black'
  };
  
  return typeColors[typeName.toLowerCase()] || 'bg-types-normal text-black';
}; 