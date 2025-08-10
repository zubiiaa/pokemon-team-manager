/**
 * @jest-environment jsdom
 */
import { addPokemonToTeam, removePokemonFromTeam, calculateTeamStats } from '../teamUtils';
import { Pokemon, PokemonTeam } from '@/types/pokemon';

const mockPokemon1: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
  sprites: {
    front_default: 'https://example.com/bulbasaur.png',
    other: {
      'official-artwork': {
        front_default: 'https://example.com/bulbasaur-art.png'
      }
    }
  },
  types: [
    {
      slot: 1,
      type: { name: 'grass', url: 'https://example.com/type/grass' }
    },
    {
      slot: 2,
      type: { name: 'poison', url: 'https://example.com/type/poison' }
    }
  ],
  stats: []
};

const mockPokemon2: Pokemon = {
  id: 4,
  name: 'charmander',
  height: 6,
  weight: 85,
  base_experience: 62,
  sprites: {
    front_default: 'https://example.com/charmander.png',
    other: {
      'official-artwork': {
        front_default: 'https://example.com/charmander-art.png'
      }
    }
  },
  types: [
    {
      slot: 1,
      type: { name: 'fire', url: 'https://example.com/type/fire' }
    }
  ],
  stats: []
};

describe('Team Utils', () => {
  describe('addPokemonToTeam', () => {
    it('should add a Pokémon to an empty team', () => {
      const emptyTeam: PokemonTeam = { pokemon: [] };
      const result = addPokemonToTeam(emptyTeam, mockPokemon1);
      
      expect(result).toEqual({
        pokemon: [mockPokemon1]
      });
    });

    it('should not add duplicate Pokémon', () => {
      const team: PokemonTeam = { pokemon: [mockPokemon1] };
      const result = addPokemonToTeam(team, mockPokemon1);
      
      expect(result).toBeNull();
    });

    it('should not add Pokémon when team is full', () => {
      const fullTeam: PokemonTeam = {
        pokemon: [
          mockPokemon1,
          mockPokemon2,
          { ...mockPokemon1, id: 2, name: 'ivysaur' },
          { ...mockPokemon1, id: 3, name: 'venusaur' },
          { ...mockPokemon1, id: 5, name: 'charmeleon' },
          { ...mockPokemon1, id: 6, name: 'charizard' }
        ]
      };
      const newPokemon = { ...mockPokemon1, id: 7, name: 'squirtle' };
      const result = addPokemonToTeam(fullTeam, newPokemon);
      
      expect(result).toBeNull();
    });
  });

  describe('removePokemonFromTeam', () => {
    it('should remove a Pokémon from the team', () => {
      const team: PokemonTeam = { pokemon: [mockPokemon1, mockPokemon2] };
      const result = removePokemonFromTeam(team, mockPokemon1.id);
      
      expect(result).toEqual({
        pokemon: [mockPokemon2]
      });
    });

    it('should return empty team when removing from single Pokémon team', () => {
      const team: PokemonTeam = { pokemon: [mockPokemon1] };
      const result = removePokemonFromTeam(team, mockPokemon1.id);
      
      expect(result).toEqual({
        pokemon: []
      });
    });
  });

  describe('calculateTeamStats', () => {
    it('should calculate stats for empty team', () => {
      const emptyTeam: PokemonTeam = { pokemon: [] };
      const stats = calculateTeamStats(emptyTeam);
      
      expect(stats).toEqual({
        totalTypes: 0,
        averageBaseExperience: 0,
        typesCovered: []
      });
    });

    it('should calculate stats for team with multiple Pokémon', () => {
      const team: PokemonTeam = { pokemon: [mockPokemon1, mockPokemon2] };
      const stats = calculateTeamStats(team);
      
      expect(stats.totalTypes).toBe(3); // grass, poison, fire
      expect(stats.averageBaseExperience).toBe(63); // (64 + 62) / 2
      expect(stats.typesCovered).toEqual(['fire', 'grass', 'poison']);
    });

    it('should handle duplicate types correctly', () => {
      const duplicateTypePokemon = {
        ...mockPokemon2,
        id: 5,
        name: 'charmeleon'
      };
      const team: PokemonTeam = { pokemon: [mockPokemon2, duplicateTypePokemon] };
      const stats = calculateTeamStats(team);
      
      expect(stats.totalTypes).toBe(1); // Only fire type
      expect(stats.typesCovered).toEqual(['fire']);
    });
  });
}); 