import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('./services/apiService', () => ({
  apiService: {
    searchPokemon: vi.fn(),
    getPokemonDetails: vi.fn(),
  },
}));
const mockLocation = {
  href: 'http://localhost:3000',
  search: '',
  pathname: '/',
};
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});
