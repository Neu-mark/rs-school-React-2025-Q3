import { Link } from 'react-router-dom';

const PAGE_LIMIT = 20;

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  currentSearch: string;
}
export default function Pagination({
  totalCount,
  currentPage,
  currentSearch,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / PAGE_LIMIT);

  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number) => {
    const searchParams = new URLSearchParams(currentSearch);
    searchParams.set('page', String(pageNumber));
    return `?${searchParams.toString()}`;
  };

  return (
    <nav className="flex items-center justify-center gap-4 mt-8">
      <Link
        to={createPageUrl(currentPage - 1)}
        className={`btn-secondary ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
      >
        « Previous
      </Link>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Link
        to={createPageUrl(currentPage + 1)}
        className={`btn-secondary ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
      >
        Next »
      </Link>
    </nav>
  );
}
