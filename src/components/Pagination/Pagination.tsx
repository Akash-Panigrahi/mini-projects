import usePagination from "./usePagination";
import "./style.css";

function Pagination() {
  const { pages, currentPage, setPage } = usePagination({
    siblingCount: 1,
    boundaryCount: 2,
    totalPages: 20,
    defaultPage: 10,
  });

  return (
    <div className="pagination">
      <button onClick={() => setPage(currentPage - 1)}>Prev</button>

      {pages.map((page, i) => {
        if (page === "...") {
          return (
            <div className="page" key={`ellipsis-${i}`}>
              ...
            </div>
          );
        }

        return (
          <div key={page} className="page">
            <button
              style={{ borderColor: currentPage === page ? "#61dafb" : "" }}
              onClick={() => setPage(page)}
            >
              {page}
            </button>
          </div>
        );
      })}

      <button onClick={() => setPage(currentPage + 1)}>Next</button>
    </div>
  );
}

export default Pagination;
