import React, { useState } from 'react';
import { usePokemonSearch } from '@/hooks/usePokemonSearch';
import { PokemonCard } from './PokemonCard';
import { Pokemon } from '@/types/pokemon';

interface PokemonSearchProps {
  onAddToTeam: (pokemon: Pokemon) => void;
  isTeamFull: boolean;
  isPokemonInTeam: (pokemonId: number) => boolean;
}

export const PokemonSearch: React.FC<PokemonSearchProps> = ({
  onAddToTeam,
  isTeamFull,
  isPokemonInTeam
}) => {
  const { searchTerm, pokemon, isLoading, error, handleSearch, clearSearch } = usePokemonSearch();
  const [inputValue, setInputValue] = useState('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleSearch(inputValue);
    }
  };

  const handleClear = () => {
    setInputValue('');
    clearSearch();
  };

  const similarPokemon = [
    { id: 1, name: 'bulbasaur' },
    { id: 4, name: 'charmander' },
    { id: 7, name: 'squirtle' },
    { id: 25, name: 'pikachu' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Search Bar */}
      <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.25rem' }}>🔍</span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>Search Pokémon</h2>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search Pokémon by name..."
              style={{ 
                flex: 1, 
                padding: '0.5rem 1rem', 
                border: '1px solid #d1d5db', 
                borderRadius: '0.375rem',
                outline: 'none'
              }}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              style={{ 
                padding: '0.5rem 1.5rem', 
                backgroundColor: '#3b82f6', 
                color: 'white', 
                border: 'none',
                borderRadius: '0.375rem',
                cursor: isLoading || !inputValue.trim() ? 'not-allowed' : 'pointer',
                opacity: isLoading || !inputValue.trim() ? 0.6 : 1
              }}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                style={{ 
                  padding: '0.5rem 1rem', 
                  backgroundColor: '#6b7280', 
                  color: 'white', 
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer'
                }}
              >
                Clear
              </button>
            )}
          </div>
        </form>

        {error && (
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: '0.375rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span>⚠️</span>
              {error}
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Try searching for one of these popular Pokémon:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {similarPokemon.map((pokemon) => (
                  <button
                    key={pokemon.name}
                    onClick={() => {
                      setInputValue(pokemon.name);
                      handleSearch(pokemon.name);
                    }}
                    style={{ 
                      padding: '0.25rem 0.75rem', 
                      backgroundColor: '#3b82f6', 
                      color: 'white', 
                      border: 'none',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {pokemon.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#2563eb' }}>
              <div style={{ width: '1.5rem', height: '1.5rem', border: '2px solid #2563eb', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
              <span>Searching for Pokémon...</span>
            </div>
          </div>
        )}
      </div>

      {/* Search Results */}
      {pokemon && (
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span>✨</span>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937' }}>Search Result</h3>
          </div>
          <div style={{ maxWidth: '300px' }}>
            <PokemonCard
              pokemon={pokemon}
              onAddToTeam={onAddToTeam}
              isInTeam={isPokemonInTeam(pokemon.id)}
              isTeamFull={isTeamFull}
            />
          </div>
        </div>
      )}

      {/* Popular Pokémon Section */}
      <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
          Showing popular Pokémon to get you started!
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { id: 1, name: 'bulbasaur' },
            { id: 4, name: 'charmander' },
            { id: 7, name: 'squirtle' },
            { id: 25, name: 'pikachu' }
          ].map((pokemon) => (
            <div key={pokemon.name} style={{ textAlign: 'center' }}>
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem', 
                padding: '1rem', 
                marginBottom: '0.5rem', 
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', 
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => {
                setInputValue(pokemon.name);
                handleSearch(pokemon.name);
              }}
              >
                                 <div style={{ 
                   width: '4rem', 
                   height: '4rem', 
                   margin: '0 auto 0.5rem', 
                   background: 'linear-gradient(135deg, #dbeafe 0%, #e9d5ff 100%)', 
                   borderRadius: '0.5rem', 
                   display: 'flex', 
                   alignItems: 'center', 
                   justifyContent: 'center',
                   overflow: 'hidden'
                 }}>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    alt={pokemon.name}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.display = 'flex';
                      }
                    }}
                  />
                  <span style={{ fontSize: '2rem', display: 'none' }}>🎯</span>
                </div>
                <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', textTransform: 'capitalize' }}>{pokemon.name}</p>
                <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>#{pokemon.id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 