import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { IFilm, ISearch } from './films.interface';


@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private readonly http: HttpClient) { }

  getFilms = (title: string): Observable<IFilm> =>
    this.http.get<IFilm>(`http://www.omdbapi.com/?t=${title}&apikey=${environment.apiKey}`)

  getFilmNames = (title: string): Observable<ISearch> =>
    this.http.get<ISearch>(`http://www.omdbapi.com/?s=${title}&apikey=${environment.apiKey}`)

}
