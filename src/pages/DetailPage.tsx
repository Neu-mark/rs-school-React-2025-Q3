import { useLoaderData, useNavigation, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { PokemonDetail } from '../types';
export default function DetailPage() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const pokemonDetails = useLoaderData() as PokemonDetail;
  const isLoading = navigation.state === 'loading';

  const handleClose = () => {
    navigate({
      pathname: '/',
      search: new URLSearchParams(window.location.search).toString(),
    });
  };

  if (isLoading) {
    return (
      <div className="card w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <aside className="card w-full h-full relative">
      <button
        onClick={handleClose}
        className="btn-secondary absolute top-2 right-2 px-2 py-1 text-xs"
        aria-label="Close details"
      >
        ✖
      </button>
      <div className="text-center">
        <h2 className="text-3xl font-bold capitalize mb-4">
          {pokemonDetails.name}
        </h2>
        <img
          src={
            pokemonDetails.sprites.other.dream_world.front_default ||
            pokemonDetails.sprites.front_default ||
            ''
          }
          alt={pokemonDetails.name}
          className="mx-auto h-40 w-40"
        />
      </div>
      <div className="mt-6">
        <h3 className="font-bold text-lg mb-2">Details:</h3>
        <ul className="space-y-1 text-gray-700">
          <li>
            <strong>ID:</strong> {pokemonDetails.id}
          </li>
          <li>
            <strong>Height:</strong> {pokemonDetails.height / 10} m
          </li>
          <li>
            <strong>Weight:</strong> {pokemonDetails.weight / 10} kg
          </li>
          <li>
            <strong>Types:</strong>{' '}
            {pokemonDetails.types
              .map((typeInfo) => typeInfo.type.name)
              .join(', ')}
          </li>
        </ul>
      </div>
    </aside>
  );
}
