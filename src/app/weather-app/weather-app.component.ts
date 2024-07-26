import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { WeatherAppService } from './weather-app.service';
import { Observable } from 'rxjs';
import { ForecastTimeComponent } from '../forecast-time/forecast-time.component';

@Component({
    selector: 'app-weather-app',
    templateUrl: './weather-app.component.html',
    styleUrl: './weather-app.component.css',
    standalone: true,
    imports: [ForecastTimeComponent],
})
export class WeatherAppComponent implements OnInit {
  @Input() city!: string;
  temp!: any;

  

  constructor(private service: WeatherAppService) {}

  ngOnInit() {
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
