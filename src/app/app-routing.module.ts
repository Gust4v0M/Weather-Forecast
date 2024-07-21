import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SearchWeatherComponent } from './search-weather/search-weather.component';
import { WeatherAppComponent } from './weather-app/weather-app.component';

const routes: Routes = [
  {path: '', component: WelcomePageComponent},
  { path: 'searchWeather', component: SearchWeatherComponent },
  { path: 'weather-app', component: WeatherAppComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
