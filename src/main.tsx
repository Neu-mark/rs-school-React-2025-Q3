import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store/store';
import Root from './Root';
import AboutPage from './pages/AboutPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import { apiService } from './services/apiService';
import { ThemeProvider } from './context/ThemeContext';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const searchTerm = url.searchParams.get('q') || '';
          const page = parseInt(url.searchParams.get('page') || '1', 10);
          const { results, totalCount } = await apiService.searchPokemon(
            searchTerm,
            page
          );
          return { results, searchTerm, totalCount, currentPage: page };
        },
        element: <HomePage />,
        children: [
          {
            path: 'pokemon/:pokemonId',
            loader: async ({ params }) => {
              const { pokemonId } = params;
              if (!pokemonId) {
                throw new Response('Not Found', { status: 404 });
              }
              return apiService.getPokemonDetails(pokemonId);
            },
            element: <DetailPage />,
          },
        ],
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
