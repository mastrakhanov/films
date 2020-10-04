export interface IFilms {
  Title?: string,
  Year?: string,
  Rated?: string,
  Released?: string,
  Runtime?: string,
  Genre?: string,
  Director?: string,
  Writer?: string,
  Actors?: string,
  Plot?: string,
  Language?: string,
  Country?: string,
  Awards?: string,
  Poster?: string,
  Ratings?: [],
  Metascore?: string,
  imdbRating?: string,
  imdbVotes?: string,
  imdbID?: string,
  Type?: string,
  DVD?: string,
  BoxOffice?: string,
  Production?: string,
  Website?: string,
  Response?: string,
  Error?: string,
  response?: string
}

export interface ISearch {
  Response?: string,
  Error?: string,
  response?: string,
  Search?: IFilms[],
  totalResults?: string
}
