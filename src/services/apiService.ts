import {
  SearchResult,
  PokemonApiResponse,
  PokemonDetail,
  PokemonSpecies,
} from '../types';

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

  async searchPokemon(searchTerm: string): Promise<SearchResult[]> {
    const trimmed = searchTerm.trim().toLowerCase();

    if (trimmed) {
      return this.fetchSinglePokemon(trimmed);
    }

    return this.fetchPokemonList();
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
        throw new Error(`Pokemon "${name}" not found`);
      }

      throw error;
    }
  }

  private async fetchPokemonList(): Promise<SearchResult[]> {
    const response = await this.fetchWithErrorHandling<PokemonApiResponse>(
      `${this.baseUrl}/pokemon?limit=20`
    );

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

    return Promise.all(pokemonPromises);
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}

export const apiService = new ApiService();
