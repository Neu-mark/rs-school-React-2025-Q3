import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { SearchResult } from '../../types';

interface SelectedItemsState {
  items: SearchResult[];
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<SearchResult>) => {
      const isAlreadyAdded = state.items.some(
        (item) => item.id === action.payload.id
      );
      if (!isAlreadyAdded) {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
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
