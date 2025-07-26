import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function SearchInitializer() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [storedSearchTerm] = useLocalStorage('searchTerm', '');

  useEffect(() => {
    const hasQueryParam = searchParams.has('q');
    if (!hasQueryParam && storedSearchTerm) {
      navigate(`/?q=${storedSearchTerm}`, { replace: true });
    }
  }, [navigate, searchParams, storedSearchTerm]);
  return null;
}
