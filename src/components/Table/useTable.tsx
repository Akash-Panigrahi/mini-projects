import { useMemo, useRef, useState } from "react";

const PAGE_SIZE = 5;

function useTable({ columns, data }) {
  const [sortConfig, setSortConfig] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(
    () => {
      const initial: Record<string, number> = {};

      columns.forEach(
        (column: Record<string, string>) => (initial[column.key] = 150),
      );

      return initial;
    },
  );

  const columnResizeRef = useRef(null);

  const toggleSort = (key: string, isMulti: boolean) => {
    setSortConfig((prev) => {
      const existing = prev.find((s) => s.key === key);
      let newEntry = null;

      if (!existing) {
        newEntry = { key, dir: "asc" };
      } else if (existing.dir === "asc") {
        newEntry = { key, dir: "desc" };
      }

      let next;

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
        if (typeof a[key] === "number") {
          if (a[key] < b[key]) return dir === "asc" ? -1 : 1;
          if (a[key] > b[key]) return dir === "asc" ? 1 : -1;
          return 0;
        }

        if (typeof a[key] === "string") {
          if (a[key].localeCompare(b[key]) === 1) return dir === "asc" ? -1 : 1;
          if (b[key].localeCompare(a[key]) === 1) return dir === "asc" ? 1 : -1;
          return 0;
        }
      }
    });
  }, [sortConfig, data]);

  const filteredData = useMemo(() => {
    return sortedData.filter((row) => {
      return Object.entries(filters).every(([key, val]) => {
        return String(row[key] || "")
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
    const newWidth = startWidth + delta;
    const newNextWidth = nextWidth + delta;

    requestAnimationFrame(() => {
      setColumnWidths((prev) => ({
        ...prev,
        [key]: newWidth,
        [nextKey]: newNextWidth,
      }));
    });
  };

  const onMouseUp = (e: MouseEvent) => {
    columnResizeRef.current = null;
    document.body.style.userSelect = "";
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseDown = (e: MouseEvent, key: string, index: number) => {
    e.preventDefault();

    const nextKey = columns[index + 1];
    if (!nextKey) return;

    columnResizeRef.current = {
      key,
      startX: e.clientX,
      startWidth: columnWidths[key],
      nextKey,
      nextWidth: columnWidths[nextKey],
    };

    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return {
    data: finalData,
    toggleSort,
    page,
    totalPages,
    setPage,
    filters,
    setFilters,
    sortConfig,
    columnWidths,
    onMouseDown,
  };
}

export default useTable;
