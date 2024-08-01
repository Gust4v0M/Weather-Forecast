import { Component, Input, OnInit } from '@angular/core';
import { WeatherAppService } from '../weather-app/weather-app.service';
import { ActivatedRoute } from '@angular/router';
import { WeatherAppComponent } from "../weather-app/weather-app.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-forecast-time',
    templateUrl: './forecast-time.component.html',
    styleUrl: './forecast-time.component.css',
    standalone: true,
    imports: [
        WeatherAppComponent,
        CommonModule     
    ] 
})
export class ForecastTimeComponent  implements OnInit {

    @Input() city!: string
    img!: any;
    time!: any;
    constructor(
        private service: WeatherAppService,
        private route : ActivatedRoute
    ){

    }
ngOnInit(): void {
    if(this.city){
        this.carregaImg();
        this.carregaHora();
    }
}

carregaImg(){
    this.service
    .currentForecast(this.city)
    .subscribe(dados => this.loadImg(dados))
}

carregaHora(){
    this.service
    .currentForecast(this.city)
    .subscribe((dados: any) => {
      this.time =  dados.forecast.forecastday[0].hour[0].time
    })
}

loadImg(dados: any){
    this.img = dados.current.condition.icon
}
}
