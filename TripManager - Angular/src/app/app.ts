import { Component, signal } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AllTrips } from './all-trips/all-trips';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, AllTrips],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('final-project');
}
