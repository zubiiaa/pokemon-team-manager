import React from 'react';
import Image from 'next/image';
import { Pokemon } from '@/types/pokemon';
import { getTypeColor } from '@/utils/teamUtils';

interface PokemonCardProps {
  pokemon: Pokemon;
  onAddToTeam?: (pokemon: Pokemon) => void;
  onRemoveFromTeam?: (pokemonId: number) => void;
  isInTeam?: boolean;
  isTeamFull?: boolean;
  showAddButton?: boolean;
  showRemoveButton?: boolean;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onAddToTeam,
  onRemoveFromTeam,
  isInTeam = false,
  isTeamFull = false,
  showAddButton = true,
  showRemoveButton = false
}) => {
  const handleAddToTeam = () => {
    if (onAddToTeam && !isTeamFull && !isInTeam) {
      onAddToTeam(pokemon);
    }
  };

  const handleRemoveFromTeam = () => {
    if (onRemoveFromTeam) {
      onRemoveFromTeam(pokemon.id);
    }
  };

  const imageUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
  
  const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23ffcb05' stroke='%23000' stroke-width='2'/%3E%3Ccircle cx='35' cy='40' r='5' fill='%23000'/%3E%3Ccircle cx='65' cy='40' r='5' fill='%23000'/%3E%3Cpath d='M 40 60 Q 50 70 60 60' stroke='%23000' stroke-width='2' fill='none'/%3E%3C/svg%3E";

  const getTypeBackgroundColor = (typeName: string): string => {
    const typeColors: Record<string, string> = {
      fire: '#F08030',
      water: '#6890F0',
      grass: '#78C850',
      electric: '#F8D030',
      psychic: '#F85888',
      ice: '#98D8D8',
      dragon: '#7038F8',
      dark: '#705848',
      fairy: '#EE99AC',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      steel: '#B8B8D0',
      normal: '#A8A878'
    };
    return typeColors[typeName.toLowerCase()] || '#A8A878';
  };

  const getTypeTextColor = (typeName: string): string => {
    const lightTypes = ['electric', 'ice', 'fairy', 'flying', 'normal'];
    return lightTypes.includes(typeName.toLowerCase()) ? '#000000' : '#FFFFFF';
  };

  return (
    <div style={{ 
      backgroundColor: 'white', 
      borderRadius: '0.5rem', 
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)', 
      overflow: 'hidden', 
      border: '2px solid #e5e7eb',
      transition: 'all 0.2s ease'
    }}>
      <div style={{ position: 'relative', height: '12rem', background: 'linear-gradient(135deg, #dbeafe 0%, #e9d5ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={imageUrl || fallbackImage}
          alt={pokemon.name}
          style={{ 
            width: '80%', 
            height: '80%', 
            objectFit: 'contain'
          }}
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
      </div>
      
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', textTransform: 'capitalize' }}>
            {pokemon.name}
          </h3>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>#{pokemon.id}</span>
        </div>
        
        {/* Types */}
        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                style={{
                  backgroundColor: getTypeBackgroundColor(type.type.name),
                  color: getTypeTextColor(type.type.name),
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '9999px',
                  fontWeight: '500'
                }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
        
        {/* Base EXP */}
        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.75rem' }}>
          <div>Base EXP: {pokemon.base_experience}</div>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {showAddButton && !isInTeam && (
            <button
              onClick={handleAddToTeam}
              disabled={isTeamFull}
              style={{ 
                flex: 1, 
                padding: '0.5rem 0.75rem', 
                borderRadius: '0.375rem', 
                fontSize: '0.875rem', 
                fontWeight: '500',
                backgroundColor: isTeamFull ? '#d1d5db' : '#3b82f6',
                color: isTeamFull ? '#6b7280' : 'white',
                border: 'none',
                cursor: isTeamFull ? 'not-allowed' : 'pointer'
              }}
            >
              {isTeamFull ? 'Team Full' : '+ Add to Team'}
            </button>
          )}
          
          {showRemoveButton && (
            <button
              onClick={handleRemoveFromTeam}
              style={{ 
                flex: 1, 
                padding: '0.5rem 0.75rem', 
                borderRadius: '0.375rem', 
                fontSize: '0.875rem', 
                fontWeight: '500',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              - Remove from Team
            </button>
          )}
          
          {isInTeam && !showRemoveButton && (
            <div style={{ 
              flex: 1, 
              padding: '0.5rem 0.75rem', 
              borderRadius: '0.375rem', 
              fontSize: '0.875rem', 
              fontWeight: '500',
              backgroundColor: '#d1fae5',
              color: '#065f46',
              textAlign: 'center',
              border: '1px solid #a7f3d0'
            }}>
              ✓ In Team
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 