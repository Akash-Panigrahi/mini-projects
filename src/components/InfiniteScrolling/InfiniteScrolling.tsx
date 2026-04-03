import { useCallback, useEffect, useRef, useState } from "react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function InfiniteScrolling() {
  const [data, setData] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);
  const sentinalRef = useRef(null);
  const abortRef = useRef<AbortController>(null);

  const hasMore = data.length < 100;

  const fetchData = useCallback(async () => {
    if (!hasMore) return;

    if (abortRef.current) abortRef.current.abort("Aborting due to new calls");

    setLoading(true);

    abortRef.current = new AbortController();

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=30&_page=${page}`,
        {
          signal: abortRef.current.signal,
        },
      );

      if (response.ok) {
        const moreData = await response.json();

        setData((prev) => [...prev, ...moreData]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore]);

  const fetchDataRef = useRef(fetchData);
  fetchDataRef.current = fetchData;

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries?.at(0)?.isIntersecting) {
          fetchDataRef.current();
        }
      },
      {
        root: containerRef.current,
        rootMargin: "200px",
      },
    );

    if (sentinalRef.current) observer.observe(sentinalRef.current);

    return () => observer?.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ height: "400px", overflowY: "auto" }}>
      {data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}

      <div ref={sentinalRef} />

      {loading && <>Loading data...</>}
      {!loading && data.length === 0 && <>No data found</>}
    </div>
  );
}

export default InfiniteScrolling;
