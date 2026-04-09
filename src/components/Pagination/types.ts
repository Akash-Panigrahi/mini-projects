export type PaginationItem = number | "...";

export type UsePaginationProps = {
  siblingCount: number;
  boundaryCount: number;
  totalPages: number;
  defaultPage: number;
};
