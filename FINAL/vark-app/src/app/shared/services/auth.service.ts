import { computed, inject, Injectable, signal } from '@angular/core';
import { map} from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from './http.service';
import { UsuarioModel } from '../models/usuario.model';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpService = inject(HttpService);
  utilService = inject(UtilService);
  usuarioLogueado = signal<UsuarioModel | null>(null);
  token = computed(() => this.httpService.token());
  esAdmin = computed(() => this.usuarioLogueado()?.rol === 'ADMIN');

  login(usuario: UsuarioModel) {
    usuario = this.utilService.buildBody(usuario, ['email', 'contrasena']);

    return this.httpService.post('/api/login', usuario, false).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.httpService.token.set(response.token);
          this.usuarioLogueado.set(response.usuario);
        }
      }),
      map((response: any) => {
        return !!(response && response.token);
      }),
    );
  }

  createAccount(usuario: UsuarioModel) {
    usuario = this.utilService.buildBody(usuario, ['nombre', 'email', 'contrasena', 'grupo']);
    return this.httpService.post('/api/usuarios', usuario, false);
  }

  logOut() {
    this.httpService.token.set(null);
    this.usuarioLogueado.set(null);
    if (typeof window !== 'undefined' && window.location) {
      window.location.reload();
    }
  }
}
