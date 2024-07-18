import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-search-weather',
  templateUrl: './search-weather.component.html',
  styleUrl: './search-weather.component.css'
})
export class SearchWeatherComponent {
  input= new FormControl();

  readonly CITY_API = 'https://servicodados.ibge.gov.br/api/v1/localidades/distritos';
  results$!: Observable<any>;
  total!: number;

  mostrarTempo: boolean = false;

  constructor(private http: HttpClient){ };


  onSearch(){
    let field = 'name'
    let value = this.input.value
    if(value && (value = value.trim()) !== ''){
      const params_ = {
        search:value,
        field: field
      };
      let param = new HttpParams();

      param = param.set('search', value);
      param = param.set('field', field);

      this.results$ = this.http
      .get(this.CITY_API, { param })
      .pipe(
        tap((res: any) => (this.total = res.total)),
        map((res: any) => res.results)
      );

    }
  }

  onClicSearch(){
   return this.mostrarTempo = !this.mostrarTempo  
  }

  

}
