"use client"

import { TMDB_MOVIE_CATEGORY_REQUEST } from '@/api_keys';
import MovieBanner from '@/components/MovieBanner';
import MovieSlide from '@/components/MovieSlide';
import { useState } from 'react';

const HomePageComponent = () => {
  const [fetching, setFetching] = useState<boolean>(true);

  return (
    <article className="container-layout">
      {/* loading icon */}
      {fetching && <div className="fetching"></div>}

      {/* popular movies list */}
      <MovieBanner  setFetching={setFetching}/>

      {/* upcoming movies list */}
      <MovieSlide title="Upcoming Movies" httpRequest={TMDB_MOVIE_CATEGORY_REQUEST("/movie/upcoming")} />

      {/* weekly trending movies list */}
      <MovieSlide title="Weekly Trending Movies" httpRequest={TMDB_MOVIE_CATEGORY_REQUEST("/trending/movie/week")} />

      {/* top rated movies list */}
      <MovieSlide title="Top Rated Movies" httpRequest={TMDB_MOVIE_CATEGORY_REQUEST("/movie/top_rated")} />
    </article>
  )
}

export default HomePageComponent;
