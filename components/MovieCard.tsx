import { GET_IMAGE_URL } from "@/api_keys"
import { Movie } from "@/common.types"
import Image from "next/image"
import Link from "next/link"


const MovieCard = ({movie}:{movie:Movie}) => {

  if (movie) {
    return (
        <div className="movie-card">
            {/* <!--movie card image--> */}
            <figure className="card-banner poster-box">
                <img
                    src={GET_IMAGE_URL("w342", movie?.poster_path || movie?.backdrop_path)} 
                    alt={movie?.title}
                    width={100}
                    height={100}
                    className="img-cover" 
                    loading="lazy"/>
            </figure>
            {/* <!--movie card title--> */}
            <h3 className="title">{movie?.title}</h3>
            
            {/* <!--movie card rating/year--> */}
            <div className="meta-list">
                <div className="meta-item">
                    <Image 
                        src="/star.png" 
                        alt="rating" 
                        width="20" 
                        height="20"/>
                    <span className="span">{movie?.vote_average.toFixed(1)}</span>
                </div>
                <div className="card-badge">{movie?.release_date.split("-")[0]}</div>
            </div>
    
            {/* <!--movie card detail link--> */}
            <Link
               href={
                {
                    pathname: "/detail",
                    query: {"movieID": movie?.id}
                }
               }
               className="card-btn" >
            </Link>
        </div>
      )
  } else {
    return (
        <div className="movie-card">
            <figure className="card-banner poster-box"></figure>
        </div>
    )
  }

}

export default MovieCard