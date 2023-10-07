"use client"

import { TMDB_MOVIE_CATEGORY_REQUEST } from "@/api_keys"
import { Movie } from "@/common.types"
import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"


const MovieSlide = ({title, httpRequest}: {title:string, httpRequest:string}) => {
  const [movieList, setMovieList] = useState<Array<Movie>|null>(null);

  useEffect(()=>{
    const fetchMovieList = async () => {
      try {
        const response = await fetch(httpRequest);
        const data = await response.json();
        setMovieList(data.results);
      }catch (error: any){
        console.log("There was an error when using TMDB MOVIE CATEGORY REQUEST");
      }
    }

    fetchMovieList();
  }, [])

  return (
    <section className="movie-list" aria-label="upcoming movies">
      {/* movie list title */}
      <div className="title-wrapper">
          <h2 className="title-large">{title}</h2>
      </div>
      {/* <movie list slides */}
      <div className="slides-container">
          <div className="slides-inner-container">
            { movieList &&
              movieList.map((movie:Movie, index)=>(
                  <MovieCard 
                    key={index}
                    movie={movie}
                  />
              ))
            }
            { (!movieList || movieList.length == 0) && <MovieCard movie={null} />}
          </div>
      </div>
    </section>
  )
}

export default MovieSlide