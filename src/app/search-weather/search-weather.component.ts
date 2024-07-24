import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
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
import { WeatherAppService } from '../weather-app/weather-app.service';

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
cidadeRelampago: any;

  constructor(private http: HttpClient, 
) {}

  ngOnInit() {
    this.results$ = this.input.valueChanges.pipe(
      filter((value) => value.length > 2),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((value: any) =>
        this.http
          .get<any>(this.CITY_API)
          .pipe(
            map((municipios) =>
              municipios.filter((municipio: any) =>
                municipio.nome.toLowerCase().includes(value.toLowerCase())
              )
            )
          )
      )
    );

  }

  onClicSearch() {


    return (this.mostrarTempo = !this.mostrarTempo);
  }
  

  selectCity(city: any){
    this.cidadeRelampago = city;
    console.log(this.cidadeRelampago)
  }
}
