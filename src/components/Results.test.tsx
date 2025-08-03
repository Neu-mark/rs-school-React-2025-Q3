import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../utils/test-utils';
import Results from './Results';
import type { SearchResult } from '../types';

const mockResults: SearchResult[] = [
  { id: 1, name: 'Pikachu', description: 'Mouse', imageUrl: 'p.png' },
  { id: 2, name: 'Charizard', description: 'Dragon', imageUrl: 'c.png' },
];

describe('Results Component', () => {
  it('should render the Loader component when loading is true', () => {
    renderWithProviders(<Results results={[]} loading={true} error={null} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render an error message when an error is provided', () => {
    renderWithProviders(
      <Results results={[]} loading={false} error="API Down" />
    );
    expect(
      screen.getByRole('heading', { name: /Oops! Something went wrong/i })
    ).toBeInTheDocument();
  });

  it('should render "No Pokémon found" message when results array is empty', () => {
    renderWithProviders(<Results results={[]} loading={false} error={null} />);
    expect(
      screen.getByRole('heading', { name: /No Pokémon found/i })
    ).toBeInTheDocument();
  });

  it('should render a list of pokemon cards', () => {
    renderWithProviders(
      <Results results={mockResults} loading={false} error={null} />
    );
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Charizard')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });
});
