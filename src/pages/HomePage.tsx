import { useEffect } from 'react';
import {
  useLoaderData,
  useNavigation,
  Outlet,
  useOutlet,
  useLocation,
} from 'react-router-dom';

import type { SearchResult } from '../types';
import Search from '../components/Search';
import Results from '../components/Results';
import SearchInitializer from '../components/SearchInitializer';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Pagination from '../components/Pagination';
import Flyout from '../components/Flyout';

interface HomeLoaderData {
  results: SearchResult[];
  searchTerm: string;
  totalCount: number;
  currentPage: number;
}

export default function HomePage() {
  const { results, searchTerm, totalCount, currentPage } =
    useLoaderData() as HomeLoaderData;
  const navigation = useNavigation();
  const location = useLocation();
  const isSearchLoading = navigation.state === 'loading';
  const [, setStoredSearchTerm] = useLocalStorage('searchTerm', searchTerm);
  const outlet = useOutlet();

  useEffect(() => {
    setStoredSearchTerm(searchTerm);
  }, [searchTerm, setStoredSearchTerm]);

  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap gap-8">
        <SearchInitializer />
        <div className="w-full md:flex-1">
          <section className="mb-8">
            <div className="card max-w-2xl mx-auto dark:bg-gray-800">
              <Search initialValue={searchTerm} />
            </div>
          </section>
          <section className="mb-8">
            <Results results={results} loading={isSearchLoading} error={null} />
            {totalCount > 0 && !isSearchLoading && (
              <Pagination
                totalCount={totalCount}
                currentPage={currentPage}
                currentSearch={location.search}
              />
            )}
          </section>
        </div>
        {outlet && (
          <div className="w-full md:w-1/3">
            <Outlet />
          </div>
        )}
      </div>
      <Flyout />
    </>
  );
}
