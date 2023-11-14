
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export const TMDB_GENRE_LIST_REQUEST = function(){
    return `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
}

export const TMDB_SEARCH_MOVIE_REQUEST = function(searchText: string, pageNumber: number){
    return `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchText.trim()}&include_adult=false&language=en-US&page=${pageNumber}`;
}

export const TMDB_POPULAR_MOVIE_REQUEST = function(){
    return `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1,2`
}


export const TMDB_MOVIE_CATEGORY_REQUEST = function(categoryPath: string){
    return `https://api.themoviedb.org/3${categoryPath}?api_key=${API_KEY}`
}

export const TMDB_MOVIE_DETAIL_REQUEST = function(movieID: string | null){
    return `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&append_to_response=casts,videos,releases`
}

export const TMDB_RECOMMENDATION_MOVIE_REQUEST = function(movieID: string | null){
    return `https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${API_KEY}`
}

export const TMDB_DISCOVER_MOVIE_REQUEST = function(urlParam: string | null, pageNumber: number){
    return `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc&${urlParam}`
}

export const GET_IMAGE_URL = function(width:string, path:string|undefined){
    if (!width) width = "w1280";
    if (!path) return "";
    return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${width}${path}`;
}




