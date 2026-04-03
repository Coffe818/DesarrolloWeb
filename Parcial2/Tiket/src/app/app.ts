import { Component, inject, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { UtilService } from '../shared/service/UtilService.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  utilService = inject(UtilService);
  protected readonly title = signal('Ticket');
  private router = inject(Router);
  constructor() {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.utilService.startLoading();
      }

      if (event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError) {
        this.utilService.stopLoading();
      }
    });
  }
}
