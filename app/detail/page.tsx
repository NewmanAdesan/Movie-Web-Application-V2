"use client"

import { TMDB_RECOMMENDATION_MOVIE_REQUEST } from "@/api_keys";
import MovieDetail from "@/components/MovieDetail";
import MovieSlide from "@/components/MovieSlide";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const DetailPage = () => {

  const [fetching, setFetching] = useState<boolean>(true);

  // obtain route parameters
  const searchParams = useSearchParams();
  const movieID = searchParams.get("movieID"); 

  return (
    <article className="container-layout">
        {/* loading icon */}
        {fetching && <div className="fetching"></div>}

        {/* detail based on movie */} 
        <MovieDetail movieID={movieID} setFetching={setFetching}/>
        
        {/* recommendation based on movie */}
        <MovieSlide title="You may also like" httpRequest={TMDB_RECOMMENDATION_MOVIE_REQUEST(movieID)} />
    </article>
  )
}

export default DetailPage;

