import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
import { WeatherAppComponent } from '../weather-app/weather-app.component';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { subscribe } from 'node:diagnostics_channel';

@Component({
    selector: 'app-search-weather',
    templateUrl: './search-weather.component.html',
    styleUrl: './search-weather.component.css',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf,
        NgFor,
        RouterLink,
        WeatherAppComponent,
        AsyncPipe,
    ],
})
export class SearchWeatherComponent implements OnInit {
 input = new FormControl();

  readonly CITY_API =
    'https://servicodados.ibge.gov.br/api/v1/localidades/municipios/';

  results$!: Observable<any[]>;
  mostrarTempo: boolean = false;
  cidadeRelampago: string = '';
  mostrarComponent: boolean = false;
  citysData: {[key: string]: any} = {}
  forCityData: {[key: string]: any}= {}

  constructor(private http: HttpClient, 
              private service: WeatherAppService
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

    const cities = ['manaus', 'salvador', 'macapa']
    cities.forEach(city =>this.getCurInfoCityes(city));

    cities.forEach(city => this.getForInfoCityes(city));
  }

  onClicSearch() {


    return (this.mostrarTempo = !this.mostrarTempo);
  }
  

  selectCity(city: string){
    this.cidadeRelampago = city;
    console.log(this.cidadeRelampago)
  }

  getCurInfoCityes(city: any){
    this.service.currentWeather(city).
    subscribe((dados: any) => {
    this.citysData[city] = dados;
    })
  }

  getForInfoCityes(city: any){
    this.service.currentForecast(city)
    .subscribe((dados: any) =>{
      this.forCityData[city] = dados
    })
  }
}
