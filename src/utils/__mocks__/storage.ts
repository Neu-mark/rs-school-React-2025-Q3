import { vi } from 'vitest';

export const saveSearchTerm = vi.fn((_searchTerm: string): void => {});
export const getSearchTerm = vi.fn((): string => {
  return '';
});

export const clearSearchTerm = vi.fn((): void => {});
