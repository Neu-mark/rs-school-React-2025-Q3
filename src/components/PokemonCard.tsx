import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItem,
  removeItem,
  selectSelectedItems,
} from '../store/slices/selectedItemsSlice';
import type { AppDispatch } from '../store/store';
import type { SearchResult } from '../types';

export default function PokemonCard({ pokemon }: { pokemon: SearchResult }) {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();

  const selectedItems = useSelector(selectSelectedItems);
  const isSelected = selectedItems.some((item) => item.id === pokemon.id);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.target.checked) {
      dispatch(addItem(pokemon));
    } else {
      dispatch(removeItem(pokemon.id));
    }
  };

  return (
    <div
      className={`card group transition-all duration-300 relative hover:scale-105 dark:bg-gray-800 ${
        isSelected
          ? 'border-pokemon-primary ring-2 ring-pokemon-primary dark:border-pokemon-accent dark:ring-pokemon-accent'
          : 'dark:border-gray-700'
      }`}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-4 right-4 h-5 w-5 z-10 rounded text-pokemon-primary focus:ring-pokemon-secondary"
        aria-label={`Select ${pokemon.name}`}
      />
      <Link
        to={{
          pathname: `/pokemon/${pokemon.name}`,
          search: location.search,
        }}
        className="block"
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
            <h3 className="text-lg font-semibold text-pokemon-primary dark:text-pokemon-accent mb-2 text-center capitalize">
              {pokemon.name}
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description:
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
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
    </div>
  );
}
