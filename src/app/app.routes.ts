import { Routes } from '@angular/router';

import { WelcomePageComponent } from "./welcome-page/welcome-page.component"

export const APP_ROUTES: Routes =[
    
    {path: '', component: WelcomePageComponent},

     
 { path: 'searchWeather', loadComponent:() => import('./search-weather/search-weather.component').then( c => c.SearchWeatherComponent) },
 { path: 'weather-app/:city', loadComponent:() => import('./weather-app/weather-app.component').then( c => c.WeatherAppComponent) }

]