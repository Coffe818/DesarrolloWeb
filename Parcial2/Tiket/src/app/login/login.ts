import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  passwordVisible = signal(false);
  user: User = new User();

  togglePassword() {
    this.passwordVisible.set(!this.passwordVisible());
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.passwordVisible() ? 'text' : 'password';
    }
  }
}
