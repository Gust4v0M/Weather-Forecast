import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherAppService {

  

  private readonly API = 'http://api.weatherapi.com/v1/current.json?key=b6cad66055604042a5c35816241207&q=';

  
  constructor(private http: HttpClient) { }

  currentWeather(value: string): Observable<any>{
    const apiUrl = `${this.API}${value}&aqi=no`
    return this.http.get(apiUrl);
  }

  getCity(res: Observable<any[]>){
    return res
  }

}
