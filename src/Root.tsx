import { Link, Outlet } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

export default function Root() {
  const throwTestError = (): void => {
    throw new Error('Тестовая ошибка для Error Boundary');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <ErrorBoundary>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-pokemon-primary mb-2">
              {}
              <Link to="/">🔍 Pokémon Search</Link>
            </h1>
            <p className="text-gray-600">
              Discover and explore Pokémon with detailed information
            </p>
          </header>
          <main>
            <Outlet />
          </main>

          <footer className="text-center mt-12 pt-8 border-t border-gray-200">
            {}
            <Link to="/about" className="btn-secondary text-sm mr-4">
              About
            </Link>
            <button
              onClick={throwTestError}
              className="btn-secondary text-sm"
              type="button"
            >
              Check Error Boundary
            </button>
            <p className="text-gray-500 text-sm mt-2">
              Built with React, React Router & Tailwind CSS
            </p>
          </footer>
        </div>
      </ErrorBoundary>
    </div>
  );
}
