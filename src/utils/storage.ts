const SEARCH_TERM_KEY = 'pokemon-search-term';

export const saveSearchTerm = (searchTerm: string): void => {
  try {
    localStorage.setItem(SEARCH_TERM_KEY, searchTerm);
  } catch {
    // Silent fail — do nothing
  }
};

export const getSearchTerm = (): string => {
  try {
    return localStorage.getItem(SEARCH_TERM_KEY) || '';
  } catch {
    return '';
  }
};

export const clearSearchTerm = (): void => {
  try {
    localStorage.removeItem(SEARCH_TERM_KEY);
  } catch {
    // Silent fail — do nothing
  }
};
