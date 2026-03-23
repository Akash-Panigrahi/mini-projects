const filterList = ["all", "active", "completed"];

function Filter({ filter, onFilterChange }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        padding: "8px",
        justifyContent: "end",
      }}
    >
      {filterList.map((filterItem) => (
        <div key={filterItem}>
          <input
            type="radio"
            name="todos-filter"
            id={`todos-filter-${filterItem}`}
            value={filterItem}
            checked={filter === filterItem}
            onChange={() => onFilterChange(filterItem)}
          />
          <label htmlFor={`todos-filter-${filterItem}`}>
            {filterItem.at(0)?.toUpperCase() + filterItem.slice(1)}
          </label>
        </div>
      ))}
    </div>
  );
}

export default Filter;
