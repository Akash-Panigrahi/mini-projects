import { useMemo, useRef, useState, type MouseEvent } from "react";
import type {
  Filters,
  ResizingState,
  RowData,
  SortConfig,
  UseTableProps,
  UseTableReturn,
} from "./types";

const PAGE_SIZE = 5;
const MIN_WIDTH = 150;

function useTable<T extends RowData>(
  props: UseTableProps<T>,
): UseTableReturn<T> {
  const { data, columns } = props;

  const [sortConfig, setSortConfig] = useState<SortConfig<T>[]>([]);
  const [filters, setFilters] = useState<Filters<T>>({});
  const [page, setPage] = useState(1);
  const [columnWidths, setColumnWidths] = useState<Record<keyof T, number>>(
    () => {
      const initial = {} as Record<keyof T, number>;

      columns.forEach((column) => {
        initial[column.key] = 200;
      });

      return initial;
    },
  );

  const columnResizeRef = useRef<ResizingState<T> | null>(null);
  const tableRef = useRef<HTMLTableElement | null>(null);

  const toggleSort = (key: keyof T, isMulti = false) => {
    setSortConfig((prev) => {
      const existing = prev.find((s) => s.key === key);
      let newEntry: SortConfig<T> | null = null;

      if (!existing) {
        newEntry = { key, dir: "asc" };
      } else if (existing.dir === "asc") {
        newEntry = { key, dir: "desc" };
      }

      let next: SortConfig<T>[];

      if (isMulti) {
        next = prev.filter((s) => s.key !== key);

        if (newEntry) next.push(newEntry);
      } else {
        next = newEntry ? [newEntry] : [];
      }

      return next;
    });

    setPage(1);
  };

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      for (const { key, dir } of sortConfig) {
        const aVal = a[key];
        const bVal = b[key];

        let result = 0; // no sort

        if (typeof aVal === "string" && typeof bVal === "string") {
          result = aVal.localeCompare(bVal);
        } else {
          result = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        }

        if (result !== 0) {
          return dir === "asc" ? result : -result;
        }
      }

      return 0;
    });
  }, [sortConfig, data]);

  const filteredData = useMemo(() => {
    return sortedData.filter((row) => {
      return Object.entries(filters).every(([key, val]) => {
        return String(row[key])
          .toLowerCase()
          .includes(String(val).toLowerCase());
      });
    });
  }, [sortedData, filters]);

  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedData = filteredData.slice(startIndex, startIndex + PAGE_SIZE);

  const finalData = paginatedData;
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  const onMouseMove = (e: MouseEvent) => {
    if (!columnResizeRef.current) return;

    const { key, startX, startWidth, nextKey, nextWidth } =
      columnResizeRef.current;

    const delta = e.clientX - startX;
    let newWidth = startWidth + delta;
    let newNextWidth = nextWidth - delta;

    if (newWidth < MIN_WIDTH) {
      newWidth = MIN_WIDTH;
      newNextWidth = startWidth + nextWidth - MIN_WIDTH;
    }

    if (newNextWidth < MIN_WIDTH) {
      newNextWidth = MIN_WIDTH;
      newWidth = startWidth + nextWidth - MIN_WIDTH;
    }

    requestAnimationFrame(() => {
      setColumnWidths((prev) => ({
        ...prev,
        [key]: newWidth,
        [nextKey]: newNextWidth,
      }));
    });
  };

  const onMouseUp = () => {
    columnResizeRef.current = null;
    document.body.style.userSelect = "";
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseDown = (e: MouseEvent, key: keyof T, index: number) => {
    e.preventDefault();

    const nextCol = columns[index + 1];
    if (!nextCol) return;

    columnResizeRef.current = {
      key,
      startX: e.clientX,
      startWidth: columnWidths[key],
      nextKey: nextCol.key,
      nextWidth: columnWidths[nextCol.key],
    };

    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const autoFitColumn = (key: keyof T) => {
    const cells = tableRef.current?.querySelectorAll(
      `[data-col="${String(key)}"]`,
    );

    let maxWidth = 0;

    cells?.forEach((cell) => {
      maxWidth = Math.max(maxWidth, cell.scrollWidth);
    });

    setColumnWidths((prev) => ({
      ...prev,
      [key]: Math.max(maxWidth, MIN_WIDTH) + 12 * 2, // adding padding
    }));
  };

  const setFilter = (key: keyof T, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

    setPage(1);
  };

  return {
    rows: finalData,
    toggleSort,
    page,
    totalPages,
    setPage,
    filters,
    setFilter,
    sortConfig,
    columnWidths,
    onMouseDown,
    tableRef,
    autoFitColumn,
  };
}

export default useTable;
