import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WeatherAppService } from './weather-app.service';
import { Observable } from 'rxjs';
import { ForecastTimeComponent } from '../forecast-time/forecast-time.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-weather-app',
    templateUrl: './weather-app.component.html',
    styleUrl: './weather-app.component.css',
    standalone: true,
    imports: [ForecastTimeComponent],
})
export class WeatherAppComponent implements OnInit {
  city!: string;
  temp!: any;  
  sensacao!: string;
  max!: string;
  min!: string;

  constructor(private service: WeatherAppService,
              private route : ActivatedRoute
  ) {}

  ngOnInit(){
    this.route.params
    .subscribe(params => {
      this.city = params['city'];
      this.carregaTempo();
      this.carregaPrevisao();
    });
  }
  
  carregaTempo() {
    if(this.city){
      this.service
      .currentWeather(this.city)
      .subscribe((dados) => {
        this.populaDados(dados),
        this.sensacaoTermica(dados),
      (error: any) => console.error('error ao buscar clima', error)});
    }
    console.log('City in ngOnChanges:', this.city);
  }

  carregaPrevisao(){
    if(this.city){
      this.service
      .currentForecast(this.city)
      .subscribe((dados) =>{
        this.MaxMinTemp(dados),
        (error: any) => console.error('deu ruim na previsão', error)})
    }
   
  }

  populaDados(dados: any) {
    if (dados && dados.current && typeof dados.current.temp_c === 'number') {
      this.temp = dados.current.temp_c;
    } else {
      console.error('Dados inválidos recebidos da API', dados);
    }
  }

  sensacaoTermica(dados: any){
    this.sensacao = dados.current.condition.text;
   
  }
  MaxMinTemp(dados: any){

    const forecastDay = dados.forecast.forecastday[0];
    if(forecastDay && forecastDay.day){
      this.max = forecastDay.day.maxtemp_c;
      this.min = forecastDay.day.mintemp_c;
    }
  }
}
