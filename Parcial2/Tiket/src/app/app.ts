import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UtilService } from '../service/UtilService.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  utilService = inject(UtilService);
  protected readonly title = signal('Tiket');
}
