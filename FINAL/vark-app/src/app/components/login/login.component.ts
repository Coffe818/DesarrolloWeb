import { Component,  signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { UsuarioModel } from "../../shared/models/usuario.model";


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
  
}

