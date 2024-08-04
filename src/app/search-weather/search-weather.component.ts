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
  private readonly mun1: string = 'http://api.weatherapi.com/v1/current.json?key=b6cad66055604042a5c35816241207&lang=pt&q=manaus&days=5&aqi=no';
  private readonly mun2: string = 'http://api.weatherapi.com/v1/current.json?key=b6cad66055604042a5c35816241207&lang=pt&q=salvador&days=5&aqi=no';
  private readonly mun3: string = 'http://api.weatherapi.com/v1/current.json?key=b6cad66055604042a5c35816241207&lang=pt&q=macapa&days=5&aqi=no';
  mainTemp!: number;
  icon!: any;
  maxTemp!: number;
  minTemp!: number;

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
  

  selectCity(city: string){
    this.cidadeRelampago = city;
    console.log(this.cidadeRelampago)
  }

  container1(){
      this.http.get(this.mun1)
      .subscribe(
        (dados: any) =>{
          this.mainTemp = dados.current.temp_c;
          this.maxTemp =  dados.forecast.forecastday[0].day.maxtemp_c;
          this.minTemp = dados.forecast.forecastday[0].day.mintemp_c;
          this.icon = dados.forecast.forecastday.dau.condition.icon;
        }

      )
  }
}
