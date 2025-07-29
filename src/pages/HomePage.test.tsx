import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import HomePage from './HomePage';
import DetailPage from './DetailPage';
import { SearchResult, PokemonDetail } from '../types';
import { apiService } from '../services/apiService';

const mockPage1: SearchResult[] = [
  { id: 1, name: 'Bulbasaur', description: 'd', imageUrl: 'i' },
];
const mockPage2: SearchResult[] = [
  { id: 2, name: 'Ivysaur', description: 'd', imageUrl: 'i' },
];
const mockBulbasaurDetails: PokemonDetail = {
  id: 1,
  name: 'Bulbasaur',
  height: 7,
  weight: 69,
  sprites: {
    front_default: 'b.png',
    other: { dream_world: { front_default: 'b_dream.png' } },
  },
  types: [{ type: { name: 'grass' } }],
  species: { url: 's.url' },
};

const routes = [
  {
    path: '/',
    element: <HomePage />,
    loader: ({ request }: { request: Request }) => {
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get('page') || '1', 10);
      return apiService.searchPokemon('', page);
    },
    children: [
      {
        path: 'pokemon/:pokemonId',
        element: <DetailPage />,
        loader: ({ params }: { params: { pokemonId?: string } }) =>
          apiService.getPokemonDetails(params.pokemonId || ''),
      },
    ],
  },
];

describe('HomePage Integration Test', () => {
  const searchPokemonMock = apiService.searchPokemon as Mock;
  const getPokemonDetailsMock = apiService.getPokemonDetails as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render initial list and open details on click', async () => {
    searchPokemonMock.mockResolvedValue({ results: mockPage1, totalCount: 40 });
    getPokemonDetailsMock.mockResolvedValue(mockBulbasaurDetails);

    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    const bulbasaurLink = await screen.findByRole('link', {
      name: /Bulbasaur/i,
    });
    await userEvent.click(bulbasaurLink);

    expect(
      await screen.findByRole('heading', { name: /Details/i })
    ).toBeInTheDocument();
  });

  it('should load the next page when pagination is clicked', async () => {
    searchPokemonMock
      .mockResolvedValueOnce({ results: mockPage1, totalCount: 40 })
      .mockResolvedValueOnce({ results: mockPage2, totalCount: 40 });

    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);
    expect(await screen.findByText('Bulbasaur')).toBeInTheDocument();
    await act(async () => {
      await router.navigate('/?page=2');
    });
    expect(await screen.findByText('Ivysaur')).toBeInTheDocument();
    expect(searchPokemonMock).toHaveBeenLastCalledWith('', 2);
  });
});
