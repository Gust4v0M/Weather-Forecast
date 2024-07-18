import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SearchWeatherComponent } from './search-weather/search-weather.component';

const routes: Routes = [
  {path: '', component: WelcomePageComponent},
  { path: 'searchWeather', component: SearchWeatherComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
