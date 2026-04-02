import { useEffect, useState } from "react";

function InfiniteScrolling() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const fetchData = async (page, controller) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`,
        {
          signal: controller.signal,
        },
      );

      if (response.ok) {
        const moreData = await response.json();

        setData((prev) => [...prev, ...moreData]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchData(page, controller);

    return () => controller.abort("Aborting due to unmount");
  }, [page]);

  return (
    <div>
      {data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

export default InfiniteScrolling;
