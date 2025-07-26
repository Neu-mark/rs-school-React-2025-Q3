import { useEffect } from 'react';
import {
  useLoaderData,
  useNavigation,
  Outlet,
  useOutlet,
} from 'react-router-dom';
import type { SearchResult } from '../types';

import Search from '../components/Search';
import Results from '../components/Results';
import SearchInitializer from '../components/SearchInitializer';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface HomeLoaderData {
  results: SearchResult[];
  searchTerm: string;
}

export default function HomePage() {
  const { results, searchTerm } = useLoaderData() as HomeLoaderData;

  const navigation = useNavigation();
  const isSearchLoading =
    navigation.state === 'loading' && navigation.location.pathname === '/';
  const [, setStoredSearchTerm] = useLocalStorage('searchTerm', '');
  const outlet = useOutlet();

  useEffect(() => {
    setStoredSearchTerm(searchTerm);
  }, [searchTerm, setStoredSearchTerm]);

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-8">
      <SearchInitializer />

      <div className="w-full md:flex-1">
        <section className="mb-8">
          <div className="card max-w-2xl mx-auto">
            <Search initialValue={searchTerm} />
          </div>
        </section>
        <section className="mb-8">
          <Results results={results} loading={isSearchLoading} error={null} />
        </section>
      </div>

      {outlet && (
        <div className="w-full md:w-1/3">
          <Outlet />
        </div>
      )}
    </div>
  );
}
