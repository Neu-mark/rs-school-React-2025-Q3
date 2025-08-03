import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface PokemonItem {
  id: string;
  name: string;
}
interface SelectedItemsState {
  items: PokemonItem[];
}
const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<PokemonItem>) => {
      const isAlreadyAdded = state.items.some(
        (item) => item.id === action.payload.id
      );
      if (!isAlreadyAdded) {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearSelectedItems: (state) => {
      state.items = [];
    },
  },
});
export const { addItem, removeItem, clearSelectedItems } =
  selectedItemsSlice.actions;
export const selectSelectedItems = (state: RootState) =>
  state.selectedItems.items;
export const selectSelectedItemsCount = (state: RootState) =>
  state.selectedItems.items.length;
export default selectedItemsSlice.reducer;
