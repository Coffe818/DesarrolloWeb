import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './start.html',
  styleUrl: './start.css',
})
export class Start {
  private usuario: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
  private router = inject(Router);

  adminAccess() {
    if (this.usuario && this.usuario.token) {
      this.router.navigate(['/admin/menu']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
