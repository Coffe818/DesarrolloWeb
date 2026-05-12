import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { HttpService } from './http.service';
import { UsuarioModel } from '../models/usuario.model';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpService = inject(HttpService);
  utilService = inject(UtilService);


  login(usuario: UsuarioModel) {
    usuario = this.utilService.buildBody(usuario, ['email', 'contrasena']);
    return this.httpService.post('/api/login', usuario, false);
  }
  createAccount(usuario: UsuarioModel) {
    usuario = this.utilService.buildBody(usuario, ['nombre', 'email', 'contrasena', 'grupo']);
    return this.httpService.post('/api/usuarios', usuario, false);
  }
}
