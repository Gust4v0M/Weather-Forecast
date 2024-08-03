import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherAppService {

  

  private readonly APICU = 'http://api.weatherapi.com/v1/current.json?key=b6cad66055604042a5c35816241207&lang=pt&q=';
  private readonly APIFOR = 'http://api.weatherapi.com/v1/forecast.json?key=b6cad66055604042a5c35816241207&q='

  
  constructor(private http: HttpClient) { }

  currentWeather(value: string): Observable<any>{
    const apiUrl = `${this.APICU}${value}&days=5&aqi=no`;
    return this.http.get(apiUrl);
  }

  currentForecast(value: string): Observable<any>{
    const apiUrl = `${this.APIFOR}${value}&days=7&aqi=no&alerts=no`;
    return this.http.get(apiUrl);
  }

  getCity(res: Observable<any[]>){
    return res
  }

}
