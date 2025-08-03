import selectedItemsReducer, {
  addItem,
  removeItem,
  clearSelectedItems,
} from './selectedItemsSlice';
import type { SearchResult } from '../../types';

const mockPokemon1: SearchResult = {
  id: 1,
  name: 'Bulbasaur',
  description: 'A strange seed was planted on its back at birth.',
  imageUrl: 'url1',
};

const mockPokemon2: SearchResult = {
  id: 4,
  name: 'Charmander',
  description: 'It has a preference for hot things.',
  imageUrl: 'url2',
};

describe('selectedItems slice', () => {
  it('should return the initial state', () => {
    expect(selectedItemsReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
    });
  });

  it('should handle addItem', () => {
    const previousState = { items: [] };
    const newState = selectedItemsReducer(previousState, addItem(mockPokemon1));
    expect(newState.items).toEqual([mockPokemon1]);
  });

  it('should not add a duplicate item', () => {
    const previousState = { items: [mockPokemon1] };
    const newState = selectedItemsReducer(previousState, addItem(mockPokemon1));
    expect(newState.items.length).toBe(1);
  });

  it('should handle removeItem', () => {
    const previousState = { items: [mockPokemon1, mockPokemon2] };
    const newState = selectedItemsReducer(
      previousState,
      removeItem(mockPokemon1.id)
    );
    expect(newState.items).toEqual([mockPokemon2]);
  });

  it('should not change state if removeItem is called with a non-existent id', () => {
    const previousState = { items: [mockPokemon1, mockPokemon2] };
    const newState = selectedItemsReducer(previousState, removeItem(999));
    expect(newState.items).toEqual(previousState.items);
  });

  it('should handle clearSelectedItems', () => {
    const previousState = { items: [mockPokemon1, mockPokemon2] };
    const newState = selectedItemsReducer(previousState, clearSelectedItems());
    expect(newState.items).toEqual([]);
  });
});
