"use client"

import { GET_IMAGE_URL, TMDB_MOVIE_DETAIL_REQUEST } from "@/api_keys"
import { Cast, Crew, MoviePlus, MovieVideoInfo } from "@/common.types"
import Image from "next/image"
import { useEffect, useState } from "react"

const MovieDetail = ({movieID, setFetching}:{movieID:string|null, setFetching: Function}) => {
    const [movie, setMovie] = useState<MoviePlus|null>(null)

    useEffect(()=>{
        const fetchMovie = async ()=>{
            try {
              setFetching(true);
              const response = await fetch(TMDB_MOVIE_DETAIL_REQUEST(movieID));
              const data = await response.json();
              setMovie(data);
              document.title = `${data?.title} - Tvflix`;
              setFetching(false);
            }catch (error: any){
              console.log("There was an error when using TMDB MOVIE DETAIL REQUEST");
            }
        }
        fetchMovie();
        return ()=>{
          document.title = "TvFlix"
        };
    }, [movieID])

/**
 * Convert the genre list data structure
 * from [ {id:"123", name:"Action"}, {id:"456", name:"Animation"} ]
 * to "Action, Animation"
 * 
 * @param {Array} genreList 
 * @returns {String} - return genre names
 */
const getGenres = function(genreList: Array<{id: number, name: string}>) {
    let newGenresList = [];
    for(const {name} of genreList) newGenresList.push(name);
    return newGenresList.join(", ");
}

/**
 * Convert the cast list data structure 
 * into a String structure only including 10 cast names
 * "Matthew McConaughey, Anne Hathaway, ..."
 * 
 * @param {Array} castList 
 * @returns {String} - return 10 cast names
 */
const getCasts = function(castList: Cast[]){
    let newCastList = [];
    for (let i=0, len=castList.length; i<len && i<10; i++) {
        newCastList.push(castList[i].name);
    }
    return newCastList.join(", ");
}


/**
 * Converts the crew list data structure 
 * to a String structure only including directors names
 * 
 * @param {Array} crewList 
 * @returns {String} - return 10 directors
 */
const getDirectors = function(crewList: Crew[] ) {
    let directorsList = [];
    for (const {job, name} of crewList) {
        if (job == "Director") directorsList.push(name); 
    }
    return directorsList.join(", ");
}



const filterVideo = (videoList: Array<MovieVideoInfo>) : Array<MovieVideoInfo> => {
  const newVideoList =  videoList.filter((videoInfo: MovieVideoInfo) => {
    return videoInfo.site=="YouTube" && (videoInfo.type == "Teaser" || videoInfo.type == "Trailer");
  });
  return newVideoList;
}

        
  return (
    <section className="movie-detail">
        {/* movie backdrop */}
        <div 
            className="backdrop-image"
            style={{backgroundImage: `url('${movie?.backdrop_path && GET_IMAGE_URL("original", movie.backdrop_path)}')`}}>
        </div>
        
        {/* movie poster */}
        <figure className="poster-box movie-poster">
            <img src={(movie?.poster_path || movie?.backdrop_path) && GET_IMAGE_URL("w1280", (movie?.poster_path || movie?.backdrop_path))} alt={movie?.title} className="img-cover"/>
        </figure>

        {/* movie detail box */}
        <div className="detail-box">
            {/* detail text content */}
            <div className="detail-content">
                {/* heading */}
                <h1 className="heading">{movie?.title}</h1>

                {/* meta list: rating,minute,year,parental-control */}
                <div className="meta-list">
                    {/* rating */}
                    <div className="meta-item">
                        <Image src="/star.png" alt="rating" width="20" height="20" />
                        <span className="span">{movie?.vote_average.toFixed(1)}</span>
                    </div>
                    <div className="separator"></div>
                    {/* minutes */}
                    <div className="meta-item">{movie?.runtime}m</div>
                    <div className="separator"></div>
                    {/* year */}
                    <div className="meta-item">{movie?.release_date.split("-")[0]}</div>
                    <div className="separator"></div>
                    {/* parental guide */}
                    <div className="meta-item card-badge">{movie?.releases && movie?.releases.countries[0]?.certification}</div>
                </div>

                {/* genres */}
                <p className="genre">{movie?.genres && getGenres(movie.genres)}</p>

                {/* description */}
                <p className="overview">{movie?.overview}</p>

                {/* casts list and directors list */}
                <div className="detail-list">
                    {/* casts */}
                    <div className="list-item">
                        <p className="list-name">Starring</p>
                        <p>{movie?.casts?.cast && getCasts(movie.casts.cast)}</p>
                    </div>
                    {/* directors */}
                    <div className="list-item">
                        <p className="list-name">Directed By</p>
                        <p>{movie?.casts?.crew && getDirectors(movie.casts.crew)}</p>
                    </div>
                </div>
            </div>

            {/* detail trailer & clips title */}
            <div className="title-wrapper">
                <h3 className="title-large">Trailers and Clips</h3>
            </div>

            {/* detail trailer & clips video */}
            <div className="slides-container">
                <div className="slides-inner-container">
                    {
                      movie?.videos?.results && filterVideo(movie?.videos?.results).map(
                        (videoInfo: MovieVideoInfo) => {
                          return (
                            <div className="video-card">
                              <iframe width={500} 
                                      height={294}
                                      src={videoInfo?.key && `https://www.youtube.com/embed/${videoInfo.key}?theme=dark&rel=1`}
                                      frameBorder="0"
                                      allowFullScreen={true}
                                      title={videoInfo?.name}
                                      className="img-cover"
                                      loading="lazy"
                              ></iframe>
                            </div>
                          )
                        }

                      )  
                    }  
                    {
                      !movie?.videos?.results && <div className="video-card"></div>
                    }
                </div>
            </div>

        </div> 
    </section>
  )
}

export default MovieDetail