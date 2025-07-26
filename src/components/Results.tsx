import { Link, useLocation } from 'react-router-dom';

import { SearchResult } from '../types';
import Loader from './Loader';

interface ResultsProps {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
}

export default function Results({ results, loading, error }: ResultsProps) {
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="card max-w-2xl mx-auto">{}</div>;
  }

  if (results.length === 0) {
    return <div className="card max-w-2xl mx-auto">{}</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {`Found ${results.length} Pokémon`}
        </h2>
        <div className="text-sm text-gray-500">
          {results.length} result{results.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((pokemon) => (
          <Link
            key={pokemon.id}
            to={{
              pathname: `/pokemon/${pokemon.name}`,
              search: location.search,
            }}
            className="card group hover:scale-105 transition-transform duration-200 block"
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
          </Link>
        ))}
      </div>
    </div>
  );
}
