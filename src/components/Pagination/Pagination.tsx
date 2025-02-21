import { useGetStarWarsPeople } from '../../hooks/useGetStarWarsPeople';
import { Button } from '../Button';

import './pagination.css';

export const Pagination = () => {
  const { data: { previous, next } = {}, updateSearchParams } =
    useGetStarWarsPeople();

  const onPagination = (url: string | null) => {
    if (!url) return;

    const page = new URLSearchParams(new URL(url).searchParams).get('page');
    if (!page) return;

    updateSearchParams((prev) => {
      prev.set('page', page);
      return prev;
    });
  };
  return (
    <div className="pagination-container">
      <Button
        ariaLabel="previous"
        className="pagination-button"
        disabled={previous === null}
        onClick={() => onPagination(previous as string | null)}
      >
        &lt;
      </Button>
      <Button
        ariaLabel="next"
        className="pagination-button"
        disabled={next === null}
        onClick={() => onPagination(next as string | null)}
      >
        &gt;
      </Button>
    </div>
  );
};
