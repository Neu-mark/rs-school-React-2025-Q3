import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, RouterProvider } from 'react-router-dom';

import type { AppStore, RootState } from '../store/store';
import { setupStore } from '../store/store';
import { ThemeProvider } from '../context/ThemeContext';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
  router?: ReturnType<typeof import('react-router-dom').createMemoryRouter>;
}

export function renderWithProviders(
  ui: ReactElement | null,
  {
    preloadedState,
    store = setupStore(preloadedState),
    router,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: ReactNode }): JSX.Element {
    return (
      <Provider store={store}>
        <ThemeProvider>
          {router ? (
            <RouterProvider router={router} />
          ) : (
            <BrowserRouter>{children}</BrowserRouter>
          )}
        </ThemeProvider>
      </Provider>
    );
  }

  const renderedUi = ui === null ? <div /> : ui;

  return {
    store,
    ...render(renderedUi, { wrapper: Wrapper, ...renderOptions }),
  };
}

export { screen, fireEvent, waitFor, within } from '@testing-library/react';
