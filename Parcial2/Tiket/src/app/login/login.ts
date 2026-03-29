import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthService } from '../../service/AuthService.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  passwordVisible = signal(false);
  user: User = new User();
  authService = inject(AuthService);

  // Captcha Math Variables
  captchaNum1 = signal(0);
  captchaNum2 = signal(0);
  captchaAnswer = signal('');
  captchaResult = signal(0);
  captchaError = signal(false);

  constructor() {
    this.generateCaptcha();
  }

  togglePassword() {
    this.passwordVisible.set(!this.passwordVisible());
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.passwordVisible() ? 'text' : 'password';
    }
  }

  generateCaptcha() {
    // Generate random numbers between 1 and 20
    this.captchaNum1.set(Math.floor(Math.random() * 20) + 1);
    this.captchaNum2.set(Math.floor(Math.random() * 20) + 1);
    this.captchaResult.set(this.captchaNum1() + this.captchaNum2());
    this.captchaAnswer.set('');
    this.captchaError.set(false);
  }

  validateCaptcha(): boolean {
    const userAnswer = parseInt(this.captchaAnswer());
    if (userAnswer === this.captchaResult()) {
      this.captchaError.set(false);
      return true;
    } else {
      this.captchaError.set(true);
      return false;
    }
  }

  onLogin() {
    // Validar campos vacíos
    if (!this.user.nombre_usuario.trim()) {
      alert('Por favor ingresa tu nombre de usuario');
      return;
    }
    if (!this.user.contrasena.trim()) {
      alert('Por favor ingresa tu contraseña');
      return;
    }

    // Validar Captcha
    if (!this.validateCaptcha()) {
      alert('Respuesta del Captcha incorrecta. Intenta de nuevo.');
      this.generateCaptcha();
      return;
    }
    console.log(this.user);
    this.authService.logIn(this.user).subscribe((response) => {

      console.log("response", response);
      alert('¡Bienvenido, ' + this.user.nombre_usuario + '!');
      // Aquí redirigirías al menú de administración
      // this.router.navigate(['/menu']);
    });
    // Simular autenticación (Credenciales: admin / admin123)
    // if (this.user.nombre === 'admin' && this.user.contrasena === 'admin123') {
    //   alert('¡Bienvenido, Administrador!');
    //   // Aquí redirigirías al menú de administración
    //   // this.router.navigate(['/menu']);
    //   this.generateCaptcha(); // Regenerar captcha para seguridad
    // } else {
    //   alert('Credenciales incorrectas. Intenta de nuevo.');
    //   this.generateCaptcha(); // Regenerar captcha si falla
    // }
  }
}
