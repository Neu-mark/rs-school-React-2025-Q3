import { useLoaderData, useNavigation } from 'react-router-dom';
import type { SearchResult } from '../types';

import Search from '../components/Search';
import Results from '../components/Results';

export default function HomePage() {
  const { results, searchTerm } = useLoaderData() as {
    results: SearchResult[];
    searchTerm: string;
  };
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <>
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
