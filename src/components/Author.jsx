import React from "react";
import { getPopularPeople } from "../api/tmdb";
import MediaGrid, { Spinner, ErrorMessage } from "./MediaGrid";
import Pager from "./Pager";
import usePagedList from "./usePagedList";

export default function Author() {
  const { page, setPage, data, loading, error } = usePagedList(getPopularPeople);

  return (
    <>
      <h2 className="h3 my-4">Popular People</h2>
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
