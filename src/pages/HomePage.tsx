import { useEffect } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import type { SearchResult } from '../types';

import Search from '../components/Search';
import Results from '../components/Results';
import SearchInitializer from '../components/SearchInitializer';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function HomePage() {
  const { results, searchTerm } = useLoaderData() as {
    results: SearchResult[];
    searchTerm: string;
  };

  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const [, setStoredSearchTerm] = useLocalStorage('searchTerm', '');

  useEffect(() => {
    setStoredSearchTerm(searchTerm);
  }, [searchTerm, setStoredSearchTerm]);

  return (
    <>
      <SearchInitializer />
      <section className="mb-8">
        <div className="card max-w-2xl mx-auto">
          <Search initialValue={searchTerm} />
        </div>
      </section>

      <section className="mb-8">
        <Results results={results} loading={isLoading} error={null} />
      </section>
    </>
  );
}
