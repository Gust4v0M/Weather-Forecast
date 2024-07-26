import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrl: './welcome-page.component.css',
    standalone: true,
    imports: [RouterLink]
})
export class WelcomePageComponent {

}
