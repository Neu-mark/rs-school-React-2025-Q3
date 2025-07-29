import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Root from './Root';

describe('Root component', () => {
  it('should render header and footer', () => {
    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { name: /Pokémon Search/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
  });
});
