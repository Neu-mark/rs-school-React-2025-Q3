import React, { Component } from 'react';
import { SearchResult } from '../types';
import Loader from './Loader';

interface ResultsProps {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
}

class Results extends Component<ResultsProps> {
  override render(): React.ReactNode {
    const { results, loading, error } = this.props;

    if (loading) {
      return <Loader />;
    }

    if (error) {
      return (
        <div className="card max-w-2xl mx-auto">
          <div className="text-center py-8">
            <div className="text-6xl mb-4">😞</div>
            <h3 className="text-xl font-semibold text-pokemon-error mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
              <p>
                <strong>Suggestions:</strong>
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Check your spelling and try again</li>
                <li>
                  Try searching for popular Pokémon like &quot;pikachu&quot; or{' '}
                  &quot;charizard&quot;
                </li>
                <li>Leave the search empty to see all Pokémon</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (results.length === 0) {
      return (
        <div className="card max-w-2xl mx-auto">
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Pokémon found
            </h3>
            <p className="text-gray-600">
              Try searching for a different Pokémon or leave the search empty to
              see all Pokémon.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {results.length === 1
              ? 'Pokémon Details'
              : `Found ${results.length} Pokémon`}
          </h2>
          <div className="text-sm text-gray-500">
            {results.length} result{results.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((pokemon) => (
            <div
              key={pokemon.id}
              className="card group hover:scale-105 transition-transform duration-200"
            >
              <div className="flex flex-col h-full">
                {pokemon.imageUrl && (
                  <div className="flex justify-center mb-4">
                    <img
                      src={pokemon.imageUrl}
                      alt={pokemon.name}
                      className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-pokemon-primary mb-2 text-center">
                    {pokemon.name}
                  </h3>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Description:
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {pokemon.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pokemon-primary text-white">
                    #{pokemon.id}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Results;
