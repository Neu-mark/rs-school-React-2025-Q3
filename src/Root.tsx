import { Link, Outlet } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { useTheme } from './context/ThemeContext';

export default function Root() {
  const throwTestError = (): void => {
    throw new Error('Тестовая ошибка для Error Boundary');
  };
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">
      <ErrorBoundary>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <header className="text-center mb-8 relative">
            <h1 className="text-4xl font-bold text-pokemon-primary mb-2">
              <Link to="/">🔍 Pokémon Search</Link>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Discover and explore Pokémon with detailed information
            </p>
            <button
              onClick={toggleTheme}
              className="absolute top-0 right-0 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </header>

          <main>
            <Outlet />
          </main>
          <footer className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/about"
              className="py-2 px-4 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm mr-4"
            >
              About
            </Link>
            <button
              onClick={throwTestError}
              className="py-2 px-4 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm"
              type="button"
            >
              Check Error Boundary
            </button>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Built with React, React Router & Tailwind CSS
            </p>
          </footer>
        </div>
      </ErrorBoundary>
    </div>
  );
}
