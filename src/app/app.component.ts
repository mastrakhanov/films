import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, combineLatest, EMPTY, merge, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

import { FilmsService } from './films.service';
import { IFilm, ISearch } from './films.interface';


const objectsJSONEqual = <T>(source: T, target: T) => JSON.stringify(source) === JSON.stringify(target);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  searchForm = new FormControl('', Validators.required);

  viewInfo = false;

  films$: Observable<IFilm> = EMPTY;
  searchList$: Observable<ISearch> = EMPTY;

  submit$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly filmsService: FilmsService) { }

  ngOnInit(): void {
    this.films$ = combineLatest([
      merge(this.searchForm.valueChanges, of(this.searchForm.value)),
      this.submit$
    ])
      .pipe(
        filter(([search, x]) => x && !!search),
        distinctUntilChanged(objectsJSONEqual),
        switchMap(([search, _]) => this.filmsService.getFilms(search)
          .pipe(
            tap(response => {
              this.submit$.next(false);

              if (response.Response === 'False') {
                this.viewInfo = false;
              }
            })
          )));

    this.searchList$ = merge(this.searchForm.valueChanges, of(this.searchForm.value))
      .pipe(
        debounceTime(300),
        filter(search => search.length >= 5),
        distinctUntilChanged(objectsJSONEqual),
        switchMap(search => this.filmsService.getFilmNames(search)));
  }

  submit(): void {

    if (this.searchForm.value === undefined || this.searchForm.value === '') {
      return;
    }

    this.submit$.next(true);
  }

}
