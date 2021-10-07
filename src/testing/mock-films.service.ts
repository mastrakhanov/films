import { Observable, of } from 'rxjs';

import { IFilm, ISearch } from '../app/films.interface';
import { filmStub, searchStub } from './stubs';


export class MockFilmsService {

  getFilms = (title: string): Observable<IFilm> => of(filmStub);

  getFilmNames = (title: string): Observable<ISearch> => of(searchStub);

}
