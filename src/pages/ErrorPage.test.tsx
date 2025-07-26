import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object;
  return {
    ...actual,
    useRouteError: () => new Error('Test Error Message'),
  };
});

describe('ErrorPage', () => {
  it('should render error details', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Test Error Message/i)).toBeInTheDocument();
  });
});
