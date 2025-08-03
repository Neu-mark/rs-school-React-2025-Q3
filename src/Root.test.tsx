import { describe, it, expect } from 'vitest';
import { screen, renderWithProviders } from './utils/test-utils';
import Root from './Root';

describe('Root component', () => {
  it('should render header and footer', () => {
    renderWithProviders(<Root />);
    expect(
      screen.getByRole('heading', { name: /pokémon search/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });
});
