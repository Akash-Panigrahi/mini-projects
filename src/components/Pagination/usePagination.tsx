import { useMemo, useState } from "react";
import type { PaginationItem, UsePaginationProps } from "./types";

const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

function usePagination(props: UsePaginationProps) {
  const {
    siblingCount = 1,
    boundaryCount = 0,
    totalPages,
    defaultPage,
  } = props;

  const [page, setPage] = useState(defaultPage);

  const pages = useMemo(() => {
    const pages = new Set<number>();

    pages.add(1);
    pages.add(totalPages);

    for (let i = 1; i <= boundaryCount; i++) {
      pages.add(i + 1);
      pages.add(totalPages - i);
    }

    for (let i = Math.abs(page - siblingCount); i <= page + siblingCount; i++) {
      if (i >= 1 && i <= totalPages) {
        pages.add(i);
      }
    }

    const sorted = Array.from(pages).sort((a, b) => a - b);

    const result: PaginationItem[] = [];

    for (let i = 0; i < sorted.length; i++) {
      const prev = sorted[i - 1];
      const curr = sorted[i];

      if (i > 0 && prev + 1 !== curr) {
        if (curr - prev === 2) {
          result.push(prev + 1);
        } else {
          result.push("...");
        }
      }

      result.push(sorted[i]);
    }

    return result;
  }, [page, totalPages, boundaryCount, siblingCount]);

  return { pages, currentPage: page, setPage };
}

export default usePagination;
