import { Component, Input, OnInit } from '@angular/core';
import { WeatherAppService } from '../weather-app/weather-app.service';
import { ActivatedRoute } from '@angular/router';
import { WeatherAppComponent } from '../weather-app/weather-app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forecast-time',
  templateUrl: './forecast-time.component.html',
  styleUrl: './forecast-time.component.css',
  standalone: true,
  imports: [WeatherAppComponent, CommonModule],
})
export class ForecastTimeComponent implements OnInit {
  @Input() city!: string;
  img!: any;
  dailyForecast: Array<any> = [];

  constructor(
    private service: WeatherAppService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    if (this.city) {
      this.loadForecast();
    }
  }

  loadForecast() {
    this.service.currentForecast(this.city)
      .subscribe((data: any) => { 
        this.dailyForecast = data.forecast.forecastday.map((day: any) => ({
          date: day.date,
          avgTempC: day.day.avgtemp_c,
          conditionIcon: day.day.condition.icon
        }));
      });
  }

  formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    return `${day}/${month}`;
  }
}
