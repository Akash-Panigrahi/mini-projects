export type Role = "User" | "Admin" | "Editor";

export type Status = "Active" | "Inactive";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  role: Role;
  status: Status;
};

export type Column<T, K extends keyof T = keyof T> = {
  key: K;
  label: string;
};

export type RowData = Record<string, any>;

export type SortDirection = "asc" | "desc";

export type SortConfig<T extends RowData> = {
  key: keyof T;
  dir: SortDirection;
};

export type Filters<T extends RowData> = Partial<Record<keyof T, string>>;

export type UseTableProps<T> = {
  data: T[];
  columns: Column<T>[];
};

export type UseTableReturn<T extends RowData> = {
  rows: T[];

  columnWidths: Record<keyof T, number>;

  sortConfig: SortConfig<T>[];
  filters: Filters<T>;

  page: number;
  totalPages: number;

  setPage: React.Dispatch<React.SetStateAction<number>>;

  toggleSort: (key: keyof T, isMulti?: boolean) => void;
  setFilter: (key: keyof T, value: string) => void;

  onMouseDown: (e: React.MouseEvent, key: keyof T, index: number) => void;

  autoFitColumn: (key: keyof T) => void;

  tableRef: React.RefObject<HTMLTableElement | null>;
};

export type ResizingState<T extends RowData> = {
  key: keyof T;
  nextKey: keyof T;

  startX: number;
  startWidth: number;
  nextWidth: number;
};
