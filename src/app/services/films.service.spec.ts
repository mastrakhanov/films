import { TestBed } from '@angular/core/testing';
import { HttpClient} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { filmStub, searchStub } from 'src/testing/stubs';
import { environment } from 'src/environments/environment';

import { FilmsService } from './films.service';


describe('FilmsService', () => {
  let filmsService: FilmsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();

    filmsService = TestBed.inject(FilmsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(filmsService).toBeTruthy();
  });

  it('should return films', () => {
    filmsService.getFilms('Title').subscribe(data => expect(data).toEqual(filmStub));
    const req = httpTestingController.expectOne(`http://www.omdbapi.com/?t=Title&apikey=${environment.apiKey}`);
    expect(req.request.method).toEqual('GET');

    req.flush(filmStub);
  });

  it('should return searchList', () => {
    filmsService.getFilmNames('Title').subscribe(data => expect(data).toEqual(searchStub));
    const req = httpTestingController.expectOne(`http://www.omdbapi.com/?s=Title&apikey=${environment.apiKey}`);
    expect(req.request.method).toEqual('GET');

    req.flush(searchStub);
  });
});
