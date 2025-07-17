import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiService } from './services/apiService';
import { getSearchTerm, saveSearchTerm } from './utils/storage';
import { SearchResult } from './types';

const mockedApiService = vi.mocked(apiService);
const mockedGetSearchTerm = vi.mocked(getSearchTerm);
const mockedSaveSearchTerm = vi.mocked(saveSearchTerm);

const mockPikachu: SearchResult = {
  id: 25,
  name: 'Pikachu',
  description: 'Electric mouse',
  imageUrl: '',
};
const mockCharizard: SearchResult = {
  id: 6,
  name: 'Charizard',
  description: 'Fire dragon',
  imageUrl: '',
};

describe('App Component - Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it('should perform an initial search for all pokemons if localStorage is empty', async () => {
    mockedGetSearchTerm.mockReturnValue('');
    mockedApiService.searchPokemon.mockResolvedValue([
      mockPikachu,
      mockCharizard,
    ]);
    render(<App />);
    expect(await screen.findByText('Pikachu')).toBeInTheDocument();
    expect(await screen.findByText('Charizard')).toBeInTheDocument();
  });

  it('should perform an initial search with the term from localStorage', async () => {
    mockedGetSearchTerm.mockReturnValue('pikachu');
    mockedApiService.searchPokemon.mockResolvedValue([mockPikachu]);
    render(<App />);
    expect(await screen.findByRole('textbox')).toHaveValue('pikachu');
    expect(await screen.findByText('Pikachu')).toBeInTheDocument();
  });

  it('should allow user to type, search, and display new results', async () => {
    const user = userEvent.setup();
    mockedGetSearchTerm.mockReturnValue('');
    mockedApiService.searchPokemon.mockResolvedValueOnce([]);
    render(<App />);
    expect(await screen.findByText('No Pokémon found')).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /Search/i });
    const newSearchTerm = 'charizard';
    mockedApiService.searchPokemon.mockResolvedValueOnce([mockCharizard]);

    await user.type(input, newSearchTerm);
    await user.click(searchButton);

    expect(mockedSaveSearchTerm).toHaveBeenCalledWith(newSearchTerm);
    expect(await screen.findByText('Charizard')).toBeInTheDocument();
  });

  it('should display an error message if the API call fails during search', async () => {
    const user = userEvent.setup();
    const errorMessage = 'API is down';
    mockedGetSearchTerm.mockReturnValue('');
    mockedApiService.searchPokemon.mockResolvedValueOnce([]);
    render(<App />);
    expect(await screen.findByText('No Pokémon found')).toBeInTheDocument();

    mockedApiService.searchPokemon.mockRejectedValueOnce(
      new Error(errorMessage)
    );

    await user.type(screen.getByRole('textbox'), 'something');
    await user.click(screen.getByRole('button', { name: /Search/i }));

    expect(
      await screen.findByText('Oops! Something went wrong')
    ).toBeInTheDocument();
  });

  it('should render the main components including the header and footer', async () => {
    mockedGetSearchTerm.mockReturnValue('');
    mockedApiService.searchPokemon.mockResolvedValue([]);
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /Pokémon Search/i })
    ).toBeInTheDocument();

    expect(await screen.findByText('No Pokémon found')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Test Error Boundary/i })
    ).toBeInTheDocument();
  });
});
