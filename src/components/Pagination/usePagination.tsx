import { useState } from "react";
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

  const totalSlots = siblingCount * 2 + boundaryCount * 2 + 3;

  if (totalPages <= totalSlots) {
    return { pages: range(1, totalPages), currentPage: page, setPage };
  }

  const middleSlots = 1 + siblingCount * 2;

  let left = page - siblingCount;
  let right = page + siblingCount;

  // Clamp
  if (left <= boundaryCount + 2) {
    left = boundaryCount + 1;
    right = left + middleSlots;
  }

  if (right >= totalPages - boundaryCount - 1) {
    right = totalPages - boundaryCount;
    left = right - middleSlots;
  }

  const slots: PaginationItem[] = [];

  for (let i = 1; i <= boundaryCount; i++) slots.push(i);

  if (left > boundaryCount + 1) slots.push("start-ellipsis");

  for (let i = left; i <= right; i++) slots.push(i);

  if (right < totalPages - boundaryCount) slots.push("end-ellipsis");

  for (let i = totalPages - boundaryCount + 1; i <= totalPages; i++)
    slots.push(i);

  return { pages: slots, currentPage: page, setPage };
}

export default usePagination;
