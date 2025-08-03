import { screen, renderWithProviders } from '../utils/test-utils';
import PokemonCard from './PokemonCard';
import { SearchResult } from '../types';

const mockPokemon: SearchResult = {
  id: 25,
  name: 'Pikachu',
  description: 'Electric mouse pokemon',
  imageUrl: 'url_to_pikachu',
};

describe('PokemonCard component', () => {
  it('should render pokemon name and image', () => {
    renderWithProviders(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('should be checked if the item is in the redux store', () => {
    const preloadedState = {
      selectedItems: { items: [mockPokemon] },
    };
    renderWithProviders(<PokemonCard pokemon={mockPokemon} />, {
      preloadedState,
    });
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});
