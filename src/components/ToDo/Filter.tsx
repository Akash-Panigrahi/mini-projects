const filterList = ["all", "active", "completed"];

function Filter({ filter, onFilterChange }) {
  return filterList.map((filterItem) => (
    <div>
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
  ));
}

export default Filter;
