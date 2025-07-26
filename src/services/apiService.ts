import {
  SearchResult,
  PokemonApiResponse,
  PokemonDetail,
  PokemonSpecies,
} from '../types';
const PAGE_LIMIT = 20;
export interface PaginatedSearchResult {
  results: SearchResult[];
  totalCount: number;
}

class ApiService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';
  private async fetchWithErrorHandling<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch data: ${error.message}`);
      }
      throw new Error('An unexpected error occurred');
    }
  }
  private async getPokemonDescription(speciesUrl: string): Promise<string> {
    try {
      const species =
        await this.fetchWithErrorHandling<PokemonSpecies>(speciesUrl);
      const englishEntry = species.flavor_text_entries.find(
        (entry) => entry.language.name === 'en'
      );
      return (
        englishEntry?.flavor_text.replace(/\f/g, ' ') ||
        'No description available'
      );
    } catch {
      return 'No description available';
    }
  }
  async searchPokemon(
    searchTerm: string,
    page = 1
  ): Promise<PaginatedSearchResult> {
    const trimmed = searchTerm.trim().toLowerCase();
    if (trimmed) {
      const results = await this.fetchSinglePokemon(trimmed);
      return { results, totalCount: results.length };
    }
    return this.fetchPokemonList(page);
  }
  public async getPokemonDetails(
    pokemonId: string | number
  ): Promise<PokemonDetail> {
    const pokemon = await this.fetchWithErrorHandling<PokemonDetail>(
      `${this.baseUrl}/pokemon/${String(pokemonId).toLowerCase()}`
    );
    return {
      ...pokemon,
      name: this.capitalize(pokemon.name),
    };
  }
  private async fetchSinglePokemon(name: string): Promise<SearchResult[]> {
    try {
      const pokemon = await this.fetchWithErrorHandling<PokemonDetail>(
        `${this.baseUrl}/pokemon/${name}`
      );
      const description = await this.getPokemonDescription(pokemon.species.url);
      return [
        {
          id: pokemon.id,
          name: this.capitalize(pokemon.name),
          description,
          imageUrl: pokemon.sprites.front_default || '',
        },
      ];
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return [];
      }
      throw error;
    }
  }
  private async fetchPokemonList(page: number): Promise<PaginatedSearchResult> {
    const offset = (page - 1) * PAGE_LIMIT;
    const url = `${this.baseUrl}/pokemon?limit=${PAGE_LIMIT}&offset=${offset}`;

    const response = await this.fetchWithErrorHandling<PokemonApiResponse>(url);

    const pokemonPromises = response.results.map(async (entry) => {
      try {
        const detail = await this.fetchWithErrorHandling<PokemonDetail>(
          entry.url
        );
        const description = await this.getPokemonDescription(
          detail.species.url
        );
        return {
          id: detail.id,
          name: this.capitalize(detail.name),
          description,
          imageUrl: detail.sprites.front_default || '',
        };
      } catch {
        return {
          id: Math.random(),
          name: this.capitalize(entry.name),
          description: 'No description available',
          imageUrl: '',
        };
      }
    });

    const results = await Promise.all(pokemonPromises);
    return { results, totalCount: response.count };
  }
  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}

export const apiService = new ApiService();
