import React from 'react';
import { PokemonCard } from './PokemonCard';
import { calculateTeamStats, getTypeColor } from '@/utils/teamUtils';
import { Pokemon } from '@/types/pokemon';

interface TeamSidebarProps {
  team: { pokemon: Pokemon[] };
  onRemoveFromTeam: (pokemonId: number) => void;
}

export const TeamSidebar: React.FC<TeamSidebarProps> = ({
  team,
  onRemoveFromTeam
}) => {
  const stats = calculateTeamStats(team);

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
    <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem', height: 'fit-content' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.25rem' }}>👥</span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>My Team</h2>
        </div>
        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          {team.pokemon.length}/6
        </span>
      </div>

      {team.pokemon.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem 0', color: '#6b7280' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
          <p>No Pokémon in your team yet.</p>
          <p style={{ fontSize: '0.875rem' }}>Search and add Pokémon to build your team!</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {team.pokemon.map((pokemon) => (
              <div key={pokemon.id} style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '0.75rem', backgroundColor: '#f9fafb' }}>
                <PokemonCard
                  pokemon={pokemon}
                  onRemoveFromTeam={onRemoveFromTeam}
                  showAddButton={false}
                  showRemoveButton={true}
                />
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.125rem' }}>📊</span>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937' }}>Team Stats</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb', borderRadius: '0.5rem', padding: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>Type Coverage:</span>
                <span style={{ fontWeight: 'bold', color: '#1f2937' }}>{stats.totalTypes} types</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb', borderRadius: '0.5rem', padding: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>Avg Base EXP:</span>
                <span style={{ fontWeight: 'bold', color: '#1f2937' }}>⚡ {stats.averageBaseExperience}</span>
              </div>
            </div>

            {stats.typesCovered.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', marginBottom: '0.5rem' }}>Types in Team:</h4>
                                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                   {stats.typesCovered.map((type) => (
                     <span
                       key={type}
                       style={{
                         backgroundColor: getTypeBackgroundColor(type),
                         color: getTypeTextColor(type),
                         fontSize: '0.75rem',
                         padding: '0.25rem 0.5rem',
                         borderRadius: '9999px'
                       }}
                     >
                       {type}
                     </span>
                   ))}
                 </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}; 