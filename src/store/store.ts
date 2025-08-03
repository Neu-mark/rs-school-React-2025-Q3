import { configureStore, combineReducers } from '@reduxjs/toolkit';
import selectedItemsReducer from './slices/selectedItemsSlice';

const rootReducer = combineReducers({
  selectedItems: selectedItemsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    ...(preloadedState && { preloadedState }),
  });
};

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
