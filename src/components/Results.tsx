import { SearchResult } from '../types';
import Loader from './Loader';
import PokemonCard from './PokemonCard';

interface ResultsProps {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
}

export default function Results({ results, loading, error }: ResultsProps) {
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return (
      <div className="card max-w-2xl mx-auto dark:bg-gray-800">
        <div className="text-center py-8">
          <div className="text-6xl mb-4">😞</div>
          <h3 className="text-xl font-semibold text-pokemon-error mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }
  if (results.length === 0) {
    return (
      <div className="card max-w-2xl mx-auto dark:bg-gray-800">
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No Pokémon found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try searching for a different Pokémon.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {`Found ${results.length} Pokémon`}
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {results.length} result{results.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
