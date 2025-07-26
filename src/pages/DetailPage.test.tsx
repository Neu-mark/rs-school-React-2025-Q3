import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import DetailPage from './DetailPage';
import { PokemonDetail } from '../types';

const renderWithLoader = (data: PokemonDetail) => {
  const router = createMemoryRouter(
    [{ path: '/pokemon/:id', loader: () => data, element: <DetailPage /> }],
    { initialEntries: ['/pokemon/25'] }
  );
  return render(<RouterProvider router={router} />);
};

describe('DetailPage Component', () => {
  const mockPokemon: PokemonDetail = {
    id: 25,
    name: 'Pikachu',
    height: 4,
    weight: 60,
    sprites: {
      front_default: 'p.png',
      other: { dream_world: { front_default: 'p_dream.png' } },
    },
    types: [{ type: { name: 'electric' } }],
    species: { url: 's.url' },
  };

  it('should render pokemon details correctly', async () => {
    renderWithLoader(mockPokemon);
    expect(await screen.findByText('Pikachu')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Details/i })
    ).toBeInTheDocument();
  });
});
