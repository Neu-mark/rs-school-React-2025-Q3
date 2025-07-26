import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Pagination from './Pagination';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('Pagination Component', () => {
  it('should not render if there is only one page', () => {
    const { container } = renderWithRouter(
      <Pagination totalCount={20} currentPage={1} currentSearch="" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should render correctly on a middle page', () => {
    renderWithRouter(
      <Pagination totalCount={100} currentPage={3} currentSearch="" />
    );
    expect(screen.getByText('Page 3 of 5')).toBeInTheDocument();
  });

  it('should disable the "Previous" button on the first page', () => {
    renderWithRouter(
      <Pagination totalCount={100} currentPage={1} currentSearch="" />
    );
    const prevLink = screen.getByRole('link', { name: /Previous/i });
    expect(prevLink).toHaveClass('pointer-events-none');
  });

  // ▼▼▼ ИСПРАВЛЕННЫЙ ТЕСТ ▼▼▼
  it('should preserve existing query parameters', () => {
    // Мы передаем ?q=pikachu в пропс, а не в MemoryRouter
    renderWithRouter(
      <Pagination totalCount={100} currentPage={2} currentSearch="?q=pikachu" />
    );
    const nextLink = screen.getByRole('link', { name: /Next/i });
    expect(nextLink).toHaveAttribute('href', '/?q=pikachu&page=3');
  });
});
