import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import HomePage from './HomePage';
import { renderWithProviders } from '../utils/test-utils';
import { createMemoryRouter } from 'react-router-dom';
import { PokemonListItem } from '../types';

const mockInitialData: {
  results: PokemonListItem[];
  searchTerm: string;
  totalCount: number;
  currentPage: number;
} = {
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  ],
  searchTerm: '',
  totalCount: 151,
  currentPage: 1,
};

describe('HomePage Integration Test', () => {
  const setup = (loaderData: unknown) => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <HomePage />,
          loader: () => loaderData,
        },
      ],
      {
        initialEntries: ['/'],
      }
    );
    renderWithProviders(null, { router });
  };

  it('should render initial list of pokemon from loader data', async () => {
    setup(mockInitialData);
    expect(await screen.findByText('bulbasaur')).toBeInTheDocument();
    expect(await screen.findByText('charmander')).toBeInTheDocument();
  });

  it('should render pagination correctly based on loader data', async () => {
    setup(mockInitialData);
    expect(await screen.findByText('Page 1 of 8')).toBeInTheDocument();
  });
});
