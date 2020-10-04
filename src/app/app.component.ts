import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FilmsService} from './films.service';
import {IFilms, ISearch} from './films.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  result: IFilms = {};
  searchList: ISearch = {};
  viewInfo = false;

  constructor(private filmsService: FilmsService) {}

  @ViewChild('inputElement') inputElement: ElementRef;

  ngOnInit(): void {
    this.form = new FormGroup({
      search_value: new FormControl('', Validators.required)
    });
  }

  submit():void {
    if (this.form.value.search_value === undefined) {
      return;
    }
    this.filmsService.getFilms(this.form.value.search_value).subscribe((item) => {
      this.result = item;
      if (this.result.Response === 'False') this.viewInfo = false;
    });
  }

  getSearchInfo():void {
    if (this.inputElement.nativeElement.value.length >= 5) {
      this.filmsService.getFilmNames(this.inputElement.nativeElement.value).subscribe((item) => {
        this.searchList = item;
      });
    }
  }

}
