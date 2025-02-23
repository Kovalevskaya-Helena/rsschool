import { useGetStarWarsPeople } from '../../hooks/useGetStarWarsPeople';
import { Button } from '../Button';

import './pagination.css';

export const Pagination = () => {
  const {
    data: { previous, next, count } = {},
    query,
    updateQuery,
  } = useGetStarWarsPeople();

  const pagesAmount = count ? Math.ceil(count / 10) : query.page;

  const onPagination = (url: string | null) => {
    if (!url) return;

    const page = new URLSearchParams(new URL(url).searchParams).get('page');
    if (!page) return;

    updateQuery('page', page);
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
      <div>
        {query?.page} / {pagesAmount}
      </div>
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
