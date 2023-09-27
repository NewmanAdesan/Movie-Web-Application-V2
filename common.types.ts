export type layoutContextType = {
  searching: boolean, 
  setSearching: Function, 
  searchText: string, 
  setSearchText: Function, 
  sidebarActive: boolean, 
  setSidebarActive: Function

}


export type SearchBoxProps = {
    searching: boolean, 
    setSearching: Function,
    setSearchBoxActive: Function, 
    setSearchText: Function
  }
  

export type HeaderProps = {
    sidebarActive: boolean, 
    searching: boolean, 
    setSearching: Function,
    setSidebarActive: Function, 
    setSearchText: Function
  }


export type SearchModalProps = {
  searchText: string,
  searching: boolean,
  setSearching: Function
}


export type Movie = {
  adult?: boolean,
  backdrop_path: string,
  title: string,
  release_date: string,
  genres_as_string?: string,
  genre_ids?: Array<number>,
  overview: string,
  poster_path: string,
  vote_average: number,
  id: number,
  original_language?: string,
  original_title?: string,
  popularity?: number,
  video?: boolean,
  vote_count?: string,
}

export type Cast = {
  "adult": boolean,
  "gender": number,
  "id": number,
  "known_for_department": string,
  "name": string,
  "original_name": string,
  "popularity": number,
  "profile_path": string | null,
  "cast_id": number,
  "character": string,
  "credit_id": string,
  "order": number
}


export type Crew = {
  "adult": boolean,
  "gender": number,
  "id": number,
  "known_for_department": string,
  "name": string,
  "original_name": string,
  "popularity": number,
  "profile_path": string|null,
  "credit_id": string,
  "department": string,
  "job": string
}


export type MovieVideoInfo = {
  "iso_639_1": string,
  "iso_3166_1": string,
  "name": string,
  "key": string,
  "published_at": string,
  "site": string,
  "size": number,
  "type": string,
  "official": boolean,
  "id": string
}


export type MovieReleasesInfo = {
  countries: Array<{
    "certification": string,
    "descriptors": [],
    "iso_3166_1": string,
    "primary": boolean,
    "release_date": string
  }>
}


export type MoviePlus = Movie & {
  belongs_to_collection?: string,
  budget?: number,
  genres?: Array<{id: number, name: string}>,
  homepage?: string,
  imdb_id?: string,
  production_companies?: object[],
  production_countries?: object[],
  revenue?: number,
  spoken_languages?: object[],
  status?: string,
  tagline?: string,
  certification: string,
  starring: string,
  directors: string,
  runtime: number,
  videos?: {results: Array<MovieVideoInfo>},
  casts: {cast: Cast[], crew: Crew[]},
  releases?: MovieReleasesInfo,
}

