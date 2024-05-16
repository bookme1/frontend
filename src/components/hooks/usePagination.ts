import { useState, useEffect, useCallback } from 'react';

const usePagination = (items: any[], itemsPerPage: number) => {
  const [page, setPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<any[]>([]);

  useEffect(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setPaginatedItems((prevItems) => [...prevItems, ...items.slice(start, end)]);
  }, [page, items, itemsPerPage]);

  const loadMoreItems = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  return { paginatedItems, loadMoreItems };
};

export default usePagination;
