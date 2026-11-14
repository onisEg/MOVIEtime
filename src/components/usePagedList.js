import { useEffect, useState } from "react";

// Loads a paginated TMDB list and tracks loading / error state.
export default function usePagedList(fetchPage) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ results: [], total_pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    fetchPage(page)
      .then((d) => !cancelled && setData(d))
      .catch(() => !cancelled && setError(true))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // fetchPage is a stable module-level function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return { page, setPage, data, loading, error };
}
