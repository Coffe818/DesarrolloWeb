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
    const logeado :boolean = this.authService.usuarioLogueado() ? true : false;
    
    return this.httpService.post('/api/examenes-presentados/enviar', examen, logeado);
  }

  obtenerResultado(idExamenPresentado: number) {
    return this.httpService.get(`/api/examenes-presentados/${idExamenPresentado}`, false);
  }

  obtenerHistorial() {
    const userId = this.authService.usuarioLogueado()?.usuario_id;

    if(this.authService.esAdmin()) {
      return this.httpService.get(`/api/examenes-presentados`, true);
    }

    return this.httpService.get(`/api/examenes-presentados/usuario/${userId}`, true);
  }
}
