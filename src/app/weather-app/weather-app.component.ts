import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { WeatherAppService } from './weather-app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrl: './weather-app.component.css',
})
export class WeatherAppComponent implements OnChanges {
  @Input() city: string= ''
  temp!: any;

  

  constructor(private service: WeatherAppService) {}

  ngOnChanges() {
    this.service
      .currentWeather(this.city)
      .subscribe((dados) => this.populaDados(dados));
    console.log(this.city)
  }

  populaDados(dados: any) {
    if (dados && dados.current && typeof dados.current.temp_c === 'number') {
      this.temp = dados.current.temp_c;
    } else {
      console.error('Dados inválidos recebidos da API', dados);
    }
  }


}
