import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {map} from 'rxjs/operators';
import {IFilms} from './films.interface';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http: HttpClient) { }

  getFilms(title: string): Observable<IFilms> {
    return this.http.get<IFilms>(`http://www.omdbapi.com/?t=${title}&apikey=${environment.apiKey}`)
      .pipe(map((film: IFilms) => {
        return {
          ...film,
          response: film.Response
        };
      }));
  }

  getFilmNames(title: string): Observable<IFilms> {
    return this.http.get<IFilms>(`http://www.omdbapi.com/?s=${title}&apikey=${environment.apiKey}`)
      .pipe(map((film: IFilms) => {
        return {
          ...film,
          response: film.Response
        };
      }));
  }
}
