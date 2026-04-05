import "./style.css";
import type { Column, RowData, User } from "./types";
import useTable from "./useTable";

const columns: Column<User>[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
];

const initialData: RowData[] = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    role: "Editor",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    role: "User",
    status: "Active",
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
    role: "User",
    status: "Active",
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 6,
    name: "Mrs. Dennis Schulist",
    username: "Leopoldo_Corkery",
    email: "Karley_Dach@jasper.info",
    role: "Editor",
    status: "Active",
  },
  {
    id: 7,
    name: "Kurtis Weissnat",
    username: "Elwyn.Skiles",
    email: "Telly.Hoeger@billy.biz",
    role: "User",
    status: "Active",
  },
  {
    id: 8,
    name: "Nicholas Runolfsdottir V",
    username: "Maxime_Nienow",
    email: "Sherwood@rosamond.me",
    role: "User",
    status: "Inactive",
  },
  {
    id: 9,
    name: "Glenna Reichert",
    username: "Delphine",
    email: "Chaim_McDermott@dana.io",
    role: "Editor",
    status: "Active",
  },
  {
    id: 10,
    name: "Clementina DuBuque",
    username: "Moriah.Stanton",
    email: "Rey.Padberg@karina.biz",
    role: "Admin",
    status: "Active",
  },
  {
    id: 11,
    name: "Leane Graham",
    username: "Bret_2",
    email: "Sincere2@april.biz",
    role: "User",
    status: "Inactive",
  },
  {
    id: 12,
    name: "Ervin Howell",
    username: "Antonette_2",
    email: "Shanna2@melissa.tv",
    role: "Editor",
    status: "Active",
  },
  {
    id: 13,
    name: "Clementine Bauch",
    username: "Samantha_2",
    email: "Nathan2@yesenia.net",
    role: "User",
    status: "Active",
  },
  {
    id: 14,
    name: "Patricia Lebsack",
    username: "Karianne_2",
    email: "Julianne2@kory.org",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 15,
    name: "Chelsey Dietrich",
    username: "Kamren_2",
    email: "Lucio2@annie.ca",
    role: "User",
    status: "Active",
  },
  {
    id: 16,
    name: "Mrs. Dennis Schulist",
    username: "Leopoldo2",
    email: "Karley2@jasper.info",
    role: "Editor",
    status: "Active",
  },
  {
    id: 17,
    name: "Kurtis Weissnat",
    username: "Elwyn2",
    email: "Telly2@billy.biz",
    role: "User",
    status: "Inactive",
  },
  {
    id: 18,
    name: "Nicholas Runolfsdottir",
    username: "Maxime2",
    email: "Sherwood2@rosamond.me",
    role: "Admin",
    status: "Active",
  },
  {
    id: 19,
    name: "Glenna Reichert",
    username: "Delphine2",
    email: "Chaim2@dana.io",
    role: "User",
    status: "Active",
  },
  {
    id: 20,
    name: "Clementina DuBuque",
    username: "Moriah2",
    email: "Rey2@karina.biz",
    role: "Editor",
    status: "Inactive",
  },
];

function Table<T extends RowData>() {
  const {
    rows,
    toggleSort,
    page,
    setPage,
    totalPages,
    filters,
    setFilter,
    sortConfig,
    columnWidths,
    onMouseDown,
    tableRef,
    autoFitColumn,
  } = useTable<T>({
    columns,
    data: initialData,
  });

  const getSortIndicator = (key: keyof T) => {
    const idx = sortConfig.findIndex((s) => s.key === key);
    if (idx === -1) return "";

    const { dir } = sortConfig[idx];
    const arrow = dir === "asc" ? "↑" : "↓";

    return `${arrow} (${idx + 1})`;
  };

  return (
    <div style={{ width: "1000px" }}>
      <table ref={tableRef}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.key}
                style={{
                  position: "relative",
                  width: columnWidths[column.key],
                }}
              >
                <div onClick={(e) => toggleSort(column.key, e.shiftKey)}>
                  {column.label} {getSortIndicator(column.key)}
                </div>

                {index !== columns.length - 1 && (
                  <div
                    onDoubleClick={() => autoFitColumn(column.key)}
                    onMouseDown={(e) => onMouseDown(e, column.key, index)}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: "-4px",
                      height: "100%",
                      width: "6px",
                      background: "grey",
                      cursor: "col-resize",
                      userSelect: "none",
                    }}
                  />
                )}
              </th>
            ))}
          </tr>

          <tr>
            {columns.map((column) => (
              <th key={column.key}>
                <input
                  style={{ width: "90%" }}
                  value={filters[column.key] || ""}
                  onChange={(e) => setFilter(column.key, e.target.value)}
                />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.key}>
                  <div data-col={column.key}>{row[column.key]}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div id="pagination">
        <button onClick={() => setPage(1)}>First</button>
        <button onClick={() => setPage((prev) => Math.max(1, prev - 1))}>
          Prev
        </button>
        {page} / {Math.max(1, totalPages)}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
        <button onClick={() => setPage(totalPages)}>Last</button>
      </div>
    </div>
  );
}

export default Table;
