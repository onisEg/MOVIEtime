import React from "react";
import { discover } from "../api/tmdb";
import MediaGrid, { Spinner, ErrorMessage } from "./MediaGrid";
import Pager from "./Pager";
import usePagedList from "./usePagedList";

const fetchTv = (page) => discover("tv", page);

export default function Tv() {
  const { page, setPage, data, loading, error } = usePagedList(fetchTv);

  return (
    <>
      <h2 className="h3 my-4">Popular TV Shows</h2>
      {error ? (
        <ErrorMessage />
      ) : loading ? (
        <Spinner />
      ) : (
        <div className="row">
          <MediaGrid items={data.results} />
        </div>
      )}
      <Pager page={page} totalPages={data.total_pages} onChange={setPage} />
    </>
  );
}
