import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { MockFilmsService } from '../testing/mock-films.service';
import { filmStub, searchStub } from '../testing/stubs';

import { FilmsService } from './services/films.service';

import { AppComponent } from './app.component';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let filmsService: FilmsService;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [{ provide: FilmsService, useClass: MockFilmsService }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    filmsService = TestBed.inject(FilmsService);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should contain input tag', () => {
    element = fixture.nativeElement;
    expect(element.innerHTML).toContain('input');
  });

  it('should contain "Поиск"', () => {
    element = fixture.nativeElement.querySelector('button');
    expect(element.textContent).toContain('Поиск');
  });

  it('should contain "Результаты поиска"', () => {
    element = fixture.nativeElement.querySelector('h2');
    expect(element.textContent).toContain('Результаты поиска');
  });

  it('should call submit()', () => {
    spyOn(component, 'submit');

    element = fixture.nativeElement.querySelector('button');
    element.click();

    expect(component.submit).toHaveBeenCalledTimes(1);
  });

  it('searchForm should be truthy', () => {
    expect(component.searchForm).toBeTruthy();
  });

  it('key "Enter" should call submit()', () => {
    spyOn(component, 'submit');

    element = fixture.nativeElement.querySelector('input');
    component.searchForm.setValue('Title');
    const keyBoardEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    element.dispatchEvent(keyBoardEvent);

    expect(component.submit).toHaveBeenCalledTimes(1);
  });

  it('should return films', (done) => {
    component.searchForm.setValue('Title');
    component.submit$.next(true);
    component.ngOnInit();

    component.films$.subscribe(films => {
      expect(films).toEqual(filmStub);
      done();
    });
  });

  it('should return searchList', (done) => {
    component.searchForm.setValue('Title');
    component.ngOnInit();

    component.searchList$.subscribe(searchList => {
      expect(searchList).toEqual(searchStub);
      done();
    });
  });

  it('should set true into submit$', () => {
    spyOn(component.submit$, 'next');
    component.searchForm.setValue('Title');
    component.submit();

    expect(component.submit$.next).toHaveBeenCalledWith(true);
  });

  it('should get away from submit() without setting value to submit$', () => {
    spyOn(component.submit$, 'next');
    component.submit();

    expect(component.submit$.next).not.toHaveBeenCalledWith(true);
  });
});
