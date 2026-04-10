import usePagination from "./usePagination";
import "./style.css";

const TOTAL_PAGES = 10;

function Pagination() {
  const { pages, currentPage, setPage } = usePagination({
    siblingCount: 1,
    boundaryCount: 1,
    totalPages: TOTAL_PAGES,
    defaultPage: 5,
  });

  const handlePageChange = (page: number) => {
    setPage(Number(page));
  };

  return (
    <div className="pagination">
      <div className="page">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          ◀
        </button>
      </div>

      {pages.map((page) => {
        if (page === "start-ellipsis" || page === "end-ellipsis") {
          return (
            <div className="page" key={page}>
              ...
            </div>
          );
        }

        return (
          <div key={page} className="page">
            <button
              style={{
                borderColor: currentPage === page ? "#61dafb" : "",
              }}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          </div>
        );
      })}

      <div className="page">
        <button
          disabled={currentPage === TOTAL_PAGES}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          ▶
        </button>
      </div>
    </div>
  );
}

export default Pagination;
