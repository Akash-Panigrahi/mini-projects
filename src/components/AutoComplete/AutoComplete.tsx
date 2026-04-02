import { useEffect, useRef, useState } from "react";
import useDebounce from "./useDebounce";
import { highlight } from "./utils.tsx";

function AutoComplete() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 1000);
  const abortRef = useRef<AbortController>(null);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    if (abortRef.current) abortRef.current.abort();

    setLoading(true);
    setActiveIndex(-1);

    const controller = new AbortController();
    abortRef.current = controller;

    fetch(
      `https://jsonplaceholder.typicode.com/users?name_like=${debouncedQuery}`,
      {
        signal: controller.signal,
      },
    )
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
        setShowDropdown(true);
      })
      .catch((err) => {
        if (err.name === "AbortError") console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedQuery]);

  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      setQuery(results[activeIndex].name);
      setShowDropdown(false);
    }
  };

  return (
    <div style={{ width: "300px", position: "relative" }}>
      <input
        id="autocomplete-input"
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
        onFocus={() => results.length && setShowDropdown(true)}
        style={{ width: "100%", padding: 8 }}
      />

      {showDropdown && (
        <div
          style={{
            position: "absolute",
            padding: 16,
            background: "rgba(0, 0, 0, 0.5)",
            maxHeight: 300,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {loading && <>Loading data...</>}

          {!loading && !results.length && <>No data available...</>}

          {!loading &&
            results.map((result, i) => (
              <div
                style={{
                  background: i === activeIndex ? "#222" : "none",
                  cursor: "pointer",
                }}
                key={result.id}
                onMouseDown={(e) => {
                  setQuery(result.name);
                  setShowDropdown(false);
                }}
              >
                {highlight(result.name, query.trim())}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default AutoComplete;
