import { render } from '@testing-library/react';
import { describe, it, expect, vi, type Mock } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import SearchInitializer from './SearchInitializer';
import { useLocalStorage } from '../hooks/useLocalStorage';

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object;
  return { ...actual, useNavigate: vi.fn() };
});
vi.mock('../hooks/useLocalStorage');

describe('SearchInitializer', () => {
  it('should call navigate when url has no query and localStorage has a term', () => {
    const navigateMock = vi.fn();
    (useNavigate as Mock).mockReturnValue(navigateMock);
    (useLocalStorage as Mock).mockReturnValue(['pikachu']);

    render(
      <MemoryRouter initialEntries={['/']}>
        <SearchInitializer />
      </MemoryRouter>
    );

    expect(navigateMock).toHaveBeenCalledWith('/?q=pikachu', { replace: true });
  });
});
