import { Component, signal, inject, DOCUMENT, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('vark-app');
  
  private document = inject(DOCUMENT);

  isDarkMode = signal<boolean>(false);
  paletaSeleccionada = signal<string>(''); 

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode.set(true);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.isDarkMode.set(true);
    }

    const savedPalette = localStorage.getItem('palette');
    if (savedPalette) {
      this.paletaSeleccionada.set(savedPalette);
    }

    //this.AplicarAtributos();
  }
  CambiarPaleta(num: string): void {
    this.paletaSeleccionada.set(num);
    localStorage.setItem('palette', num);
    this.AplicarAtributos();
  }

  ToggleTheme(): void {
    const newTheme = !this.isDarkMode();
    this.isDarkMode.set(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    this.AplicarAtributos();
  }

  private AplicarAtributos(): void {
    const htmlElement = this.document.documentElement;

    htmlElement.removeAttribute('data-palette');
    htmlElement.removeAttribute('data-bs-theme');

    htmlElement.setAttribute('data-palette', this.paletaSeleccionada());
    htmlElement.setAttribute('data-bs-theme', this.isDarkMode() ? 'dark' : 'light');
  }
}
