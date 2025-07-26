import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Results from './Results';
import type { SearchResult } from '../types';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('Results Component', () => {
  const mockResults: SearchResult[] = [
    { id: 1, name: 'Pikachu', description: 'Mouse', imageUrl: 'p.png' },
    { id: 2, name: 'Charizard', description: 'Dragon', imageUrl: 'c.png' },
  ];

  it('should render the Loader component when loading is true', () => {
    renderWithRouter(<Results results={[]} loading={true} error={null} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render an error message when an error is provided', () => {
    renderWithRouter(<Results results={[]} loading={false} error="API Down" />);
    expect(
      screen.getByRole('heading', { name: /Oops! Something went wrong/i })
    ).toBeInTheDocument();
  });

  it('should render "No Pokémon found" message when results array is empty', () => {
    renderWithRouter(<Results results={[]} loading={false} error={null} />);
    expect(
      screen.getByRole('heading', { name: /No Pokémon found/i })
    ).toBeInTheDocument();
  });
  it('should render a list of pokemon cards', () => {
    renderWithRouter(
      <Results results={mockResults} loading={false} error={null} />
    );
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Charizard')).toBeInTheDocument();
  });
});
