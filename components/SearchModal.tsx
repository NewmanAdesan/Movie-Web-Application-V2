"use client"

import { TMDB_SEARCH_MOVIE_REQUEST } from '@/api_keys'
import { Movie, SearchModalProps } from '@/common.types'
import React, { useEffect, useState } from 'react'
import { useLayoutContext } from './LayoutContext'
import MovieCard from './MovieCard'

const SearchModal = () => {
  

  const contextValue = useLayoutContext();
  if (contextValue === null) return <></>;
  const {searchText, searching, setSearching} = contextValue;

  const [movieList, setMovieList] = useState<Array<Movie>|null>(null);
  const [timeoutID, setTimeoutID] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<{pageToFetch:number, totalPage: number}>({
    pageToFetch: 1,
    totalPage: 1
  })
  let loadMoreClass = loading ? "btn load-more loading" : "btn load-more"

  useEffect(()=>{
    clearTimeout(timeoutID);
    const fetchMovieList = async () => {
      try {

        // fetch data
        const response = await fetch(TMDB_SEARCH_MOVIE_REQUEST(searchText, pageInfo.pageToFetch));
        const data = await response.json();

        // update movie-list & page-info state
        setMovieList(data.results);   
        setPageInfo((prevState)=>(  
          {
            pageToFetch: prevState.pageToFetch+1,
            totalPage: data.pages
          }
        ))

        // update loadMore button display
        if (pageInfo.totalPage == 1) loadMoreClass = loadMoreClass + " hidden"; 

        // update search icon display
        setSearching(false);
      }catch (error: any){
        console.log("There was an error when using TMDB SEARCH MOVIE REQUEST");
      }
    }

    setTimeoutID(Number(setTimeout(fetchMovieList, 1000)));
  }, [searchText])


  const fetchMoreMovie = async () => {
    // display loading icon
    setLoading(true);

    try {
      // fetch new page
      const response = await fetch(TMDB_SEARCH_MOVIE_REQUEST(searchText, pageInfo.pageToFetch));
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
      if (pageInfo.pageToFetch > pageInfo.totalPage) loadMoreClass = loadMoreClass + " hidden";

      // update loading state
      setLoading(false);

    }catch (error: any){
      console.log("There was an error when using TMDB DISCOVER MOVIE REQUEST to fetch more");
    }  
  }


  if (searchText) {
    return ( 
        <div className="search-modal">
          {/* loading icon */}
          {searching && <div className="fetching"></div>}
          {movieList?.length !== 0 ? (
          <>
            <p className="label ">Result For</p>
            <h1 className="heading">{searchText}</h1>
            <div className="movie-list grid-list">
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
            <>
              <p className="label mx-auto w-max text-primary">No Results</p>
            </>
          )}
      </div>
      
    )
  } else {
    return <></>
  }
}


export default SearchModal;
