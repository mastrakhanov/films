import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FilmsService} from './films.service';
import {IFilms, ISearch} from './films.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  form: FormGroup;
  result: IFilms = {};
  searchList: ISearch = {};
  viewInfo = false;
  fSub: Subscription;
  nSub: Subscription;

  constructor(private filmsService: FilmsService) {}

  @ViewChild('inputElement') inputElement: ElementRef;

  ngOnInit(): void {
    this.form = new FormGroup({
      search_value: new FormControl('', Validators.required)
    });
  }

  submit():void {
    if (this.form.value.search_value === undefined || this.form.value.search_value === '') {
      return;
    }
    this.fSub = this.filmsService.getFilms(this.form.value.search_value).subscribe((item) => {
      this.result = item;
      if (this.result.Response === 'False') this.viewInfo = false;
    });
  }

  getSearchInfo():void {
    if (this.inputElement.nativeElement.value.length >= 5) {
      this.nSub = this.filmsService.getFilmNames(this.inputElement.nativeElement.value).subscribe((item) => {
        this.searchList = item;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.nSub) {
      this.nSub.unsubscribe();
    }

    if (this.fSub) {
      this.fSub.unsubscribe();
    }
  }

}
