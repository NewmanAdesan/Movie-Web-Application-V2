import { TMDB_DISCOVER_MOVIE_REQUEST } from "@/api_keys";
import { Movie } from "@/common.types";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";


const MovieList = ({urlParam, categoryName, setFetching}:{urlParam:string|null, categoryName:string|null, setFetching: Function}) => {
    const [movieList, setMovieList] = useState<Array<Movie>|null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [pageInfo, setPageInfo] = useState<{pageToFetch:number, totalPage: number}>({
      pageToFetch: 1,
      totalPage: 1
    })
    let loadMoreClass = loading ? "btn load-more loading" : "btn load-more"

  useEffect(()=>{
    const fetchMovieList = async () => {
      try {
        setFetching(true);
        const response = await fetch(TMDB_DISCOVER_MOVIE_REQUEST(urlParam, pageInfo.pageToFetch));
        const data = await response.json();
        setMovieList(data.results);   // update movie list state
        setPageInfo((prevState)=>(    // update page info state
          {
            pageToFetch: prevState.pageToFetch+1,
            totalPage: data.pages
          }
        ))
        if (pageInfo.totalPage == 1) loadMoreClass = loadMoreClass + " none"; 
        setFetching(false);
      }catch (error: any){
        console.log("There was an error when using TMDB DISCOVER MOVIE REQUEST");
      }
    }
    fetchMovieList();
    document.title = `${categoryName} Movies - Tvflix`;
    return ()=>{
      document.title = "TvFlix"
    };
  }, [urlParam])


    const fetchMoreMovie = async () => {

      // display loading icon
      setLoading(true);

      try {
        const response = await fetch(TMDB_DISCOVER_MOVIE_REQUEST(urlParam, pageInfo.pageToFetch));
        const data = await response.json();
        // update movie list state
        setMovieList((prevState)=>{
          if (prevState){
            return [
              ...prevState,
              ...data.results
            ]
          }
          return [];
        });  
        // update page info state
        setPageInfo((prevState)=>(    
          {
            pageToFetch: prevState.pageToFetch+1,
            totalPage: data.pages
          }
        ))
        // update load more button
        if (pageInfo.pageToFetch > pageInfo.totalPage) loadMoreClass = loadMoreClass + " none";
        // update loading state
        setLoading(false);

      }catch (error: any){
        console.log("There was an error when using TMDB DISCOVER MOVIE REQUEST to fetch more");
      }  
    }

    return (
        <section className="movie-list genre-list">
            <div className="title-wrapper">
                <h2 className="heading">All {categoryName} Movies</h2>
            </div>
            {movieList?.length != 0 ? (
              <>
                <div className="grid-list">
                    { movieList &&
                    movieList.map((movie:Movie, index)=>(
                        <MovieCard 
                            key={index}
                            movie={movie}
                        />
                    ))
                    }
                </div>
              <button className={loadMoreClass} onClick={()=>fetchMoreMovie()}>Load More</button>
            </>

            ) : (
              <p className="label mx-auto w-max text-primary">No Results</p>
            )}
        </section>
    )
}

export default MovieList;