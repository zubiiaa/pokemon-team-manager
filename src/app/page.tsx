'use client';

import React from 'react';
import { useTeam } from '@/hooks/useTeam';
import { PokemonSearch } from '@/components/PokemonSearch';
import { TeamSidebar } from '@/components/TeamSidebar';
import { Pokemon } from '@/types/pokemon';

export default function Home() {
  const { team, addPokemon, removePokemon, isTeamFull, isPokemonInTeam } = useTeam();

  const handleAddToTeam = (pokemon: Pokemon) => {
    addPokemon(pokemon);
  };

  const handleRemoveFromTeam = (pokemonId: number) => {
    removePokemon(pokemonId);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e6f3ff 0%, #f0f5ff 50%, #fdf2f8 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2rem', animation: 'bounce-slow 2s ease-in-out infinite' }}>⚡</span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937' }}>
              Pokémon Team Builder
            </h1>
            <span style={{ fontSize: '2rem', animation: 'bounce-slow 2s ease-in-out infinite' }}>⚡</span>
          </div>
          <p style={{ color: '#6b7280' }}>
            Search for your favorite Pokémon and build the ultimate team of 6! Track your team's type coverage and battle stats.
          </p>
        </header>

        {/* Main Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          {/* Search Section */}
          <div>
            <PokemonSearch
              onAddToTeam={handleAddToTeam}
              isTeamFull={isTeamFull}
              isPokemonInTeam={isPokemonInTeam}
            />
          </div>

          {/* Team Sidebar */}
          <div>
            <TeamSidebar
              team={team}
              onRemoveFromTeam={handleRemoveFromTeam}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 