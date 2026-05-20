import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpService = inject(HttpService);
  authService = inject(AuthService);

  obtenerListaUsuarios() {
    return this.httpService.get('/api/usuarios', true);
  }

  borrarUsuario(usuarioId: number) {
    return this.httpService.delete(`/api/usuarios/${usuarioId}`, true);
  }
  
  updateUsuario(usuarioId: number, data: any) {
    return this.httpService.put(`/api/usuarios/${usuarioId}`, data, true);
  }
}
