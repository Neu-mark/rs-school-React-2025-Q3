import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import Search from './Search';
import React from 'react';

describe('Refactored Search Component', () => {
  const renderWithDataRouter = (ui: React.ReactElement) => {
    const routes = [{ path: '/', element: ui }];
    const router = createMemoryRouter(routes);
    return render(<RouterProvider router={router} />);
  };

  it('should render with the initial value provided', () => {
    const initialValue = 'charizard';
    renderWithDataRouter(<Search initialValue={initialValue} />);

    const input = screen.getByPlaceholderText(
      /Enter Pokémon name/i
    ) as HTMLInputElement;
    expect(input.value).toBe(initialValue);
  });

  it('should have an input field with the correct "name" attribute', () => {
    renderWithDataRouter(<Search initialValue="" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'q');
  });

  it('should render a submit button', () => {
    renderWithDataRouter(<Search initialValue="" />);

    const button = screen.getByRole('button', { name: /Search/i });
    expect(button).toBeInTheDocument();
  });
});
