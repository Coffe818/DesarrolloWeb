import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  httpService = inject(HttpService);
  authService = inject(AuthService);
  
  generarExamen(idTipo: string) {
    return this.httpService.get(`/api/examenes/${idTipo}`, false);
  }

  guardarExamen(examen: any) {
    return this.httpService.post('/api/examenes-presentados/enviar', examen, false);
  }

  obtenerResultado(idExamenPresentado: number) {
    return this.httpService.get(`/api/examenes-presentados/${idExamenPresentado}`, false);
  }

  obtenerHistorial() {
    const userId = this.authService.usuarioLogueado()?.usuario_id;
    return this.httpService.get(`/api/examenes-presentados/usuario/${userId}`, true);
  }
}
