import "./style.css";
import useTable from "./useTable";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
];

const initialData = [
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

function Table() {
  const {
    data,
    toggleSort,
    page,
    setPage,
    totalPages,
    filters,
    setFilters,
    sortConfig,
  } = useTable({
    columns,
    data: initialData,
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>
                <div onClick={() => toggleSort(column.key)}>
                  {column.label}{" "}
                  {sortConfig?.key === column.key &&
                    (sortConfig?.dir === "asc" ? <>&#8593;</> : <>&#8595;</>)}
                </div>
              </th>
            ))}
          </tr>

          <tr>
            {columns.map((column) => (
              <th key={column.key} style={{ paddingTop: 0 }}>
                <input
                  value={filters[column.key] || ""}
                  onChange={(e) => {
                    setFilters((prev) => ({
                      ...prev,
                      [column.key]: e.target.value,
                    }));
                    setPage(1);
                  }}
                />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.role}</td>
              <td>{row.status}</td>
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
