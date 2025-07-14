import React, { Component } from 'react';
import { SearchResult } from './types';
import { apiService } from './services/apiService';
import { saveSearchTerm, getSearchTerm } from './utils/storage';
import ErrorBoundary from './components/ErrorBoundary';
import Search from './components/Search';
import Results from './components/Results';

interface AppState {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      error: null,
      searchTerm: getSearchTerm(),
    };
  }

  override async componentDidMount(): Promise<void> {
    const savedSearchTerm = getSearchTerm();
    await this.performSearch(savedSearchTerm);
  }

  private performSearch = async (searchTerm: string): Promise<void> => {
    this.setState({ loading: true, error: null });

    try {
      const results = await apiService.searchPokemon(searchTerm);
      this.setState({ results, loading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      this.setState({ error: errorMessage, loading: false, results: [] });
    }
  };

  private handleSearch = async (searchTerm: string): Promise<void> => {
    const trimmedTerm = searchTerm.trim();
    this.setState({ searchTerm: trimmedTerm });
    saveSearchTerm(trimmedTerm);
    await this.performSearch(trimmedTerm);
  };

  private throwTestError = (): void => {
    throw new Error('Test error for Error Boundary');
  };

  override render(): React.ReactNode {
    const { results, loading, error, searchTerm } = this.state;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <ErrorBoundary>
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Header */}
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold text-pokemon-primary mb-2">
                🔍 Pokémon Search
              </h1>
              <p className="text-gray-600">
                Discover and explore Pokémon with detailed information
              </p>
            </header>

            <section className="mb-8">
              <div className="card max-w-2xl mx-auto">
                <Search
                  onSearch={this.handleSearch}
                  initialValue={searchTerm}
                  disabled={loading}
                />
              </div>
            </section>

            <section className="mb-8">
              <Results results={results} loading={loading} error={error} />
            </section>

            <footer className="text-center mt-12 pt-8 border-t border-gray-200">
              <button
                onClick={this.throwTestError}
                className="btn-secondary text-sm"
                type="button"
              >
                🧪 Test Error Boundary
              </button>
              <p className="text-gray-500 text-sm mt-2">
                Built with React Class Components & Tailwind CSS
              </p>
            </footer>
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
