import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('should render the about page content', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { name: /About the App/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /RS School React Course/i })
    ).toBeInTheDocument();
  });
});
