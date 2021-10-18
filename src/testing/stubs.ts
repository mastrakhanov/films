import { IFilm, ISearch } from '../app/interfaces';


export const filmStub: IFilm = { Year: '2018', imdbRating: '6', Actors: 'Actors', Director: 'Director', Title: 'Title', Response: 'True' };

export const searchStub: ISearch = { totalResults: '1', Search: [filmStub], Response: 'True' };
