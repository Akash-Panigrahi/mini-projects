import { useMemo, useState } from "react";

const PAGE_SIZE = 5;

function useTable({ columns, data }) {
  const [sortConfig, setSortConfig] = useState(null);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const toggleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
      }

      return { key: key, dir: "asc" };
    });

    setPage(1);
  };

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    const { key, dir } = sortConfig;

    return [...data].sort((a, b) => {
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

  return {
    data: finalData,
    toggleSort,
    page,
    totalPages,
    setPage,
    filters,
    setFilters,
    sortConfig,
  };
}

export default useTable;
