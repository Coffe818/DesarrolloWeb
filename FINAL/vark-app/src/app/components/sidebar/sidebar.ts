import { Component, signal, inject, DOCUMENT } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  isDarkMode = signal<boolean>(false);
  isSidebarOpen = false;
  private document = inject(DOCUMENT);
  private router = inject(Router);
  authService = inject(AuthService);

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode.set(true);
    }
    this.AplicarTema();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ToggleTheme(): void {
    const newTheme = !this.isDarkMode();
    this.isDarkMode.set(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    this.AplicarTema();
  }

  private AplicarTema(): void {
    if (this.isDarkMode()) {
      this.document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      this.document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }

  logOut() {
    this.authService.logOut();
  }

}
