import { Form, useNavigation } from 'react-router-dom';

interface SearchProps {
  initialValue: string;
}

export default function Search({ initialValue }: SearchProps) {
  const navigation = useNavigation();

  const isSearching = navigation.state !== 'idle';

  return (
    <div className="w-full">
      <Form role="search" className="w-full">
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              name="q"
              defaultValue={initialValue}
              placeholder="Enter Pokémon name (e.g., pikachu, charizard)..."
              className="input-primary"
              disabled={isSearching}
            />
          </div>

          <button
            type="submit"
            className="btn-primary px-6 whitespace-nowrap"
            disabled={isSearching}
          >
            {isSearching ? (
              <span className="flex items-center gap-2">
                <span className="loading-spinner"></span>
                Searching...
              </span>
            ) : (
              <span className="flex items-center gap-2">🔍 Search</span>
            )}
          </button>
        </div>
      </Form>
      <div className="mt-3 text-sm text-gray-600">
        <p>
          💡 <strong>Tip:</strong> Leave empty to see all Pokémon, or search for
          specific ones!
        </p>
      </div>
    </div>
  );
}
