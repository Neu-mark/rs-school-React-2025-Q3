import { screen, renderWithProviders } from '../utils/test-utils';
import Flyout from './Flyout';
import { SearchResult } from '../types';

const mockPokemon: SearchResult = {
  id: 25,
  name: 'Pikachu',
  description: 'Electric mouse',
  imageUrl: 'url',
};

describe('Flyout component', () => {
  it('should not render when no items are selected', () => {
    renderWithProviders(<Flyout />);
    expect(screen.queryByText(/item(s)? selected/i)).not.toBeInTheDocument();
  });

  it('should render when items are selected', () => {
    const preloadedState = {
      selectedItems: {
        items: [mockPokemon],
      },
    };
    renderWithProviders(<Flyout />, { preloadedState });
    expect(screen.getByText('1 item selected')).toBeInTheDocument();
  });
});
