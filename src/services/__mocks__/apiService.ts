import { vi } from 'vitest';
import { SearchResult } from '../../types';

const mockSearchPokemon = vi.fn(
  async (searchTerm: string): Promise<SearchResult[]> => {
    if (searchTerm === 'error') {
      throw new Error('Network Error');
    }
    if (searchTerm === 'pikachu') {
      return [
        {
          id: 25,
          name: 'Pikachu',
          description: 'A mouse-like creature that generates electricity.',
          imageUrl: 'url-to-pikachu.png',
        },
      ];
    }
    return [];
  }
);

export const apiService = {
  searchPokemon: mockSearchPokemon,
};
