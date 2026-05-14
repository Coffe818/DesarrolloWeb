import { Component,  inject,  signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { UsuarioModel } from "../../shared/models/usuario.model";
import { AuthService } from "../../shared/services/auth.service";
import { UtilService } from "../../shared/services/util.service";
import { AlertService } from "../../shared/services/alert.service";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, MatIconModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  esLogin = signal(true);
  passwordVisible = signal(false);
  user: UsuarioModel = new UsuarioModel();
  authService = inject(AuthService);
  alertService = inject(AlertService);

  togglePassword() {
    this.passwordVisible.set(!this.passwordVisible());
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.passwordVisible() ? 'text' : 'password';
    }
  }

  toggleLogin() {
    this.esLogin.set(!this.esLogin());
  }

  logIn(){
    this.authService.login(this.user).subscribe({
      next: (response) => {
        this.alertService.success('¡Inicio de sesión exitoso!');
        console.log('Usuario logueado:', this.authService.usuarioLogueado());
        console.log('Token:', this.authService.token());
      }
    });
  }

  createAccount() {
    this.authService.createAccount(this.user).subscribe({
        next: (response) => {
          this.alertService.success('¡Cuenta creada exitosamente!');
          this.esLogin.set(true); 
        }
    });
  }
  
}

