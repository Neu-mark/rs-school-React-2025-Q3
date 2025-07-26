export interface SearchResult {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
}

export interface ApiResponse<T> {
  results: T[];
  count: number;
  next?: string;
  previous?: string;
}

export interface PokemonApiResponse {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  species: {
    url: string;
  };
}

export interface PokemonSpecies {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
}

export interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
  errorInfo?: string;
}
