import { render, screen, within } from '@testing-library/react';
import Results from './Results';
import { describe, it, expect } from 'vitest';
import { SearchResult } from '../types';

const mockPokemon: SearchResult[] = [
  {
    id: 25,
    name: 'Pikachu',
    description:
      'When it is angered, it immediately discharges the energy stored in the pouches on its cheeks.',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  },
  {
    id: 6,
    name: 'Charizard',
    description:
      'It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
  },
];

describe('Results Component', () => {
  it('should render the Loader component when loading is true', () => {
    render(<Results results={[]} loading={true} error={null} />);
    expect(screen.getByText('Searching for Pokémon...')).toBeInTheDocument();
  });

  it('should render an error message when an error is provided', () => {
    const errorMessage = 'Pokemon "Mewtwo" not found';
    render(<Results results={[]} loading={false} error={errorMessage} />);
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should render "No Pokémon found" message when results array is empty and not loading', () => {
    render(<Results results={[]} loading={false} error={null} />);
    expect(screen.getByText('No Pokémon found')).toBeInTheDocument();
  });

  it('should render a single pokemon card correctly', () => {
    const firstPokemon = mockPokemon[0];
    if (!firstPokemon) {
      throw new Error('Test data is invalid');
    }

    const singlePokemon = [firstPokemon];
    render(<Results results={singlePokemon} loading={false} error={null} />);
    expect(
      screen.getByRole('heading', { name: 'Pokémon Details' })
    ).toBeInTheDocument();

    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards).toHaveLength(1);

    const firstCard = cards[0];
    if (!firstCard) {
      throw new Error('Card element not found');
    }

    expect(firstCard).toHaveTextContent('Pikachu');

    const cardElement = firstCard.closest('.card');
    if (!cardElement) {
      throw new Error('Card container not found');
    }

    const utils = within(cardElement as HTMLElement);
    expect(utils.getByText(/Description:/)).toBeInTheDocument();
    expect(
      utils.getByText(
        /When it is angered, it immediately discharges the energy/
      )
    ).toBeInTheDocument();
    expect(utils.getByRole('img', { name: 'Pikachu' })).toBeInTheDocument();
    expect(utils.getByText('#25')).toBeInTheDocument();
  });

  it('should render a list of pokemon cards when results are provided', () => {
    render(<Results results={mockPokemon} loading={false} error={null} />);
    expect(
      screen.getByRole('heading', {
        name: `Found ${mockPokemon.length} Pokémon`,
      })
    ).toBeInTheDocument();

    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards).toHaveLength(mockPokemon.length);

    const firstCard = cards[0];
    const secondCard = cards[1];

    if (!firstCard || !secondCard) {
      throw new Error('Card elements not found');
    }

    expect(firstCard).toHaveTextContent('Pikachu');
    expect(secondCard).toHaveTextContent('Charizard');
  });
});
