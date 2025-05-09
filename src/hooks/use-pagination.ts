import { useState } from 'react';

const getPaginatedSlice = <T>(array: T[], page: number, pageSize: number) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, array.length);
  return array.slice(startIndex, endIndex);
};

export const usePagination = <T>(items: T[], pageSize = 5) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedItems = getPaginatedSlice(items, currentPage, pageSize);
  const totalPages = Math.ceil(items.length / pageSize);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;
  const nextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const previousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return {
    paginatedItems,
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    pageSize,
    nextPage,
    previousPage,
    goToPage,
  };
};
