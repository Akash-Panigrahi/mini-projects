export type PaginationItem = number | "start-ellipsis" | "end-ellipsis";

export type UsePaginationProps = {
  siblingCount: number;
  boundaryCount: number;
  totalPages: number;
  defaultPage: number;
};
