import { Component, signal, inject, DOCUMENT } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  // Señal para el modo oscuro (camelCase minúscula)
  isDarkMode = signal<boolean>(false);

  isSidebarOpen = false;
  // Inyectamos el DOCUMENT para cambiar el <html>
  private document = inject(DOCUMENT);

  constructor() {
    // Leemos el tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode.set(true);
    }
    this.AplicarTema();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Método para cambiar el tema (camelCase con mayúscula inicial)
  ToggleTheme(): void {
    const newTheme = !this.isDarkMode();
    this.isDarkMode.set(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    this.AplicarTema();
  }

  // Función privada para aplicar el atributo al <html>
  private AplicarTema(): void {
    if (this.isDarkMode()) {
      this.document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      this.document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }
}
