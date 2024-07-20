import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-search-weather',
  templateUrl: './search-weather.component.html',
  styleUrl: './search-weather.component.css',
})
export class SearchWeatherComponent implements OnInit {
  input = new FormControl();

  readonly CITY_API =
    'https://servicodados.ibge.gov.br/api/v1/localidades/municipios/';
  results$!: Observable<any[]>;

  mostrarTempo: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.results$ = this.input.valueChanges.pipe(
      filter((value) => value.length > 2),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((value: any) =>
        this.http.get<any>(this.CITY_API).pipe(
          map((municipios) =>
            municipios.filter((municipio: any) =>
              municipio.nome.toLowerCase().includes(value.toLowerCase())
            )
          )
        )))
  }

  onSearch() {
    let value = this.input.value;
    if (value && value !== '') {
      this.results$ = this.http.get(this.CITY_API + value).pipe(
        map((res: any) => [res.nome]),
        tap((res) => console.log(res))
      );
    }
  }

  onClicSearch() {
    return (this.mostrarTempo = !this.mostrarTempo);
  }
}

function switcMap(
  p0: (value: any) => Observable<Object>
): import('rxjs').OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}
