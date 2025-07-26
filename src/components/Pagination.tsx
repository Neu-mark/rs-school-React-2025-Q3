import { Link, useLocation } from 'react-router-dom';

const PAGE_LIMIT = 20;

interface PaginationProps {
  totalCount: number;
  currentPage: number;
}

export default function Pagination({
  totalCount,
  currentPage,
}: PaginationProps) {
  const location = useLocation();

  const totalPages = Math.ceil(totalCount / PAGE_LIMIT);
  if (totalPages <= 1) {
    return null;
  }
  const createPageUrl = (pageNumber: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', String(pageNumber));
    return `?${searchParams.toString()}`;
  };

  return (
    <nav className="flex items-center justify-center gap-4 mt-8">
      {}
      <Link
        to={createPageUrl(currentPage - 1)}
        className={`btn-secondary ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
        aria-disabled={currentPage === 1}
      >
        « Previous
      </Link>

      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      {}
      <Link
        to={createPageUrl(currentPage + 1)}
        className={`btn-secondary ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
        aria-disabled={currentPage >= totalPages}
      >
        Next »
      </Link>
    </nav>
  );
}
