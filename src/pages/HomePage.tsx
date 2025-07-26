import { useEffect } from 'react';
import {
  useLoaderData,
  useNavigation,
  Outlet,
  useOutlet,
} from 'react-router-dom';
import type { PaginatedSearchResult } from '../services/apiService';

import Search from '../components/Search';
import Results from '../components/Results';
import SearchInitializer from '../components/SearchInitializer';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Pagination from '../components/Pagination';

interface HomeLoaderData extends PaginatedSearchResult {
  searchTerm: string;
  currentPage: number;
}

export default function HomePage() {
  const { results, searchTerm, totalCount, currentPage } =
    useLoaderData() as HomeLoaderData;

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
          {}
          <Pagination totalCount={totalCount} currentPage={currentPage} />
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
