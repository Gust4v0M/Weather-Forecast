import { Component, Input, OnInit } from '@angular/core';
import { WeatherAppService } from './weather-app.service';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrl: './weather-app.component.css',
})
export class WeatherAppComponent implements OnInit {
  city: string = 'sao paulo';
  temp!: any;

  constructor(private service: WeatherAppService) {}

  ngOnInit() {
    this.service
      .currentWeather(this.city)
      .subscribe((dados) => this.populaDados(dados));
  }

  populaDados(dados: any) {
    if (dados && dados.current && typeof dados.current.temp_c === 'number') {
      this.temp = dados.current.temp_c;
    } else {
      console.error('Dados inválidos recebidos da API', dados);
    }
  }
}
