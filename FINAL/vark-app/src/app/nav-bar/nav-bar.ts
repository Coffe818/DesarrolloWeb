import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBarComponent {
  // Señal para controlar el modo oscuro (regla: camelCase minúscula)
  isDarkMode = signal<boolean>(false);

  constructor() {
    // Leemos si ya había un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode.set(true);
    }
    this.AplicarTema();
  }

  // Método para cambiar el tema (regla: camelCase con mayúscula inicial)
  ToggleTheme(): void {
    const newTheme = !this.isDarkMode();
    this.isDarkMode.set(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    this.AplicarTema();
  }

  // Función privada para aplicar el atributo al <html>
  private AplicarTema(): void {
    if (this.isDarkMode()) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }
}
