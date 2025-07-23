import { render, screen } from '@testing-library/react';
import Loader from './Loader';
import { describe, it, expect } from 'vitest';

describe('Loader Component', () => {
  it('should render the loading spinner and text correctly', () => {
    render(<Loader />);
    const loadingText = screen.getByText('Searching for Pokémon...');
    expect(loadingText).toBeInTheDocument();
    const waitText = screen.getByText(
      'Please wait while we fetch Pokémon data...'
    );
    expect(waitText).toBeInTheDocument();
  });
});
