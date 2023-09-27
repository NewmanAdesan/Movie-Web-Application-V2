"use client"

import { GET_IMAGE_URL, TMDB_GENRE_LIST_REQUEST, TMDB_POPULAR_MOVIE_REQUEST } from '@/api_keys'
import { Movie } from '@/common.types'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


type BannerSlideItem = {
  movie:Movie, 
  number:number, 
  activeSlide:number
}

const BannerSlide = ({movie, number, activeSlide}:BannerSlideItem) => {
  const bannerSlideClassname = (number==activeSlide ? "slide-item active" : "slide-item");
  return (
    <div className={bannerSlideClassname}>
        <img 
          src={GET_IMAGE_URL("w1280", movie?.backdrop_path || movie?.poster_path)} 
          alt={movie?.title} 
          className="img-cover" 
          loading="lazy"
        />
        <div className="banner-content">
            <h2 className="heading">{movie?.title}</h2>
            <div className="meta-list">
                <div className="meta-item">{movie?.release_date.split("-")[0]}</div>
                <div className="meta-item card-badge">{movie?.vote_average.toFixed(1)}</div>
            </div>
            <p className="genre">{movie?.genres_as_string}</p>
            <p className="banner-text">{movie?.overview}</p>
            <Link
              href={{ pathname: "/detail", query: {"movieID": movie?.id}}}
              className="btn">
                <Image
                  src="/play_circle.png" 
                  alt="play circle" 
                  width="24" 
                  height="24" 
                  aria-hidden="true"
                />
                <span>Watch Now</span>
            </Link>
        </div>
    </div>
  )
}


const BannerSlideController = ({movie, number, activeSlide, setActiveSlide}:{movie:Movie, number:number, activeSlide:number, setActiveSlide:Function}) => {
  const bannerSlideControllerClassname = (number==activeSlide ? "slide-item poster-box active" : "slide-item poster-box");
  
  return (
    <button className={bannerSlideControllerClassname} onClick={()=>setActiveSlide(number)}>
      <img src={GET_IMAGE_URL("w154", movie?.poster_path || movie?.backdrop_path)} alt={`Slide to ${movie?.title}`} className="img-cover" loading="lazy" draggable="false"/>
    </button>
  )
}



const MovieBanner = ({setFetching}:{setFetching: Function}) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [movieList, setMovieList] = useState<Array<Movie>|null>(null)

  useEffect(()=>{
    const fetchMovieList = async ()=>{
      try{
        setFetching(true);

        // OBTAIN TMDB GENRE LIST
        let genreList: Record<number, string>  = {}
        try{
          const genreListResponse = await fetch(TMDB_GENRE_LIST_REQUEST());
          const genreListData = await genreListResponse.json();
          for (const {id, name} of genreListData.genres) {
            genreList[id] = name;
          };
        }catch(error){
          console.log("Failed to Fetch Genre List.")
        }

        // Function that would convert genreIds to their corresponding strings
        const asString = (genreIds: Array<number>) => {
          let newGenreList = [];
          for (const genreId of genreIds){
            genreList[genreId] && newGenreList.push(genreList[genreId])
          }
          return newGenreList.join(", ");
        }

        // OBTAIN TMDB POPULAR MOVIE LIST
        const response = await fetch(TMDB_POPULAR_MOVIE_REQUEST());
        const data = await response.json();
        let newResults = [];

        // EDIT TMDB POPULAR MOVIE LIST
        for (const movie of data.results){
          const newMovie = { 
            ...movie,
            genres_as_string: movie?.genre_ids && asString(movie.genre_ids)
          }
          newResults.push(newMovie);
        } 

        setMovieList(newResults);

        setFetching(false);

      }catch (error) {
        console.log("Failed to Fetch Popular Movie List")
      }
    }

    fetchMovieList();
  }, [])

  return (
    <section className="banner" aria-label="popular movies">
      {/* banner slides */}
      <div className="slides">
        { movieList &&
          movieList.map((movie:Movie, index:number)=>(
          <BannerSlide key={index} number={index} movie={movie} activeSlide={activeSlide} />
          ))
        }
      </div>  
      
      {/* banner slide controllers */}
      <div className="slides-controller">
        <div className="slides-controller-inner">
          { movieList &&
            movieList.map((movie:Movie, index)=>(
            <BannerSlideController key={index} number={index} movie={movie} activeSlide={activeSlide} setActiveSlide={setActiveSlide} />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default MovieBanner;
