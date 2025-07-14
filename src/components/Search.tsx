import React, { Component, FormEvent, ChangeEvent } from 'react';

interface SearchProps {
  onSearch: (searchTerm: string) => Promise<void>;
  initialValue: string;
  disabled?: boolean;
}

interface SearchState {
  searchTerm: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchTerm: props.initialValue,
    };
  }

  override componentDidUpdate(prevProps: SearchProps): void {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.setState({ searchTerm: this.props.initialValue });
    }
  }

  private handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchTerm: event.target.value });
  };

  private handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    await this.props.onSearch(this.state.searchTerm);
  };

  override render(): React.ReactNode {
    const { searchTerm } = this.state;
    const { disabled } = this.props;

    return (
      <div className="w-full">
        <form onSubmit={this.handleSubmit} className="w-full">
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={this.handleInputChange}
                placeholder="Enter Pokémon name (e.g., pikachu, charizard)..."
                className="input-primary"
                disabled={disabled}
              />
            </div>

            <button
              type="submit"
              className="btn-primary px-6 whitespace-nowrap"
              disabled={disabled}
            >
              {disabled ? (
                <span className="flex items-center gap-2">
                  <span className="loading-spinner"></span>
                  Searching...
                </span>
              ) : (
                <span className="flex items-center gap-2">🔍 Search</span>
              )}
            </button>
          </div>
        </form>

        <div className="mt-3 text-sm text-gray-600">
          <p>
            💡 <strong>Tip:</strong> Leave empty to see all Pokémon, or search
            for specific ones!
          </p>
        </div>
      </div>
    );
  }
}

export default Search;
