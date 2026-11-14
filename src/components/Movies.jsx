import React from "react";
import { discover } from "../api/tmdb";
import MediaGrid, { Spinner, ErrorMessage } from "./MediaGrid";
import Pager from "./Pager";
import usePagedList from "./usePagedList";

const fetchMovies = (page) => discover("movie", page);

export default function Movies() {
  const { page, setPage, data, loading, error } = usePagedList(fetchMovies);

  return (
    <>
      <h2 className="h3 my-4">Popular Movies</h2>
      {error ? (
        <ErrorMessage />
      ) : loading ? (
        <Spinner />
      ) : (
        <div className="row">
          <MediaGrid items={data.results} getLink={(m) => `/moviedetalis/${m.id}`} />
        </div>
      )}
      <Pager page={page} totalPages={data.total_pages} onChange={setPage} />
    </>
  );
}
