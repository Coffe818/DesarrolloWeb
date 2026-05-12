import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  backed: string = (import.meta as any).env.NG_APP_BACKEND_URL;
  httpService = inject(HttpService);


  generarExamen(idTipo: string) {
    return this.httpService.get(`/api/examenes/${idTipo}`, false);
  }

  guardarExamen(examen: any) {
    return this.httpService.post('/api/examenes-presentados/enviar', examen, false);
  }
}
