import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ContactoModel } from '../../shared/models/contacto.model';

@Component({
  selector: 'app-landing',
  imports: [FormsModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class LandingComponent {
  contacto: ContactoModel = new ContactoModel();
  
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {}

  btnEnviarCorreo() {
    const url = (import.meta as any).env.NG_APP_FORMSPREE_URL;
    const datos = {
      asunto: this.contacto.Asunto,
      mensaje: this.contacto.Mensaje + '\n\n' + 'Nombre: ' + this.contacto.Nombre + '\nCorreo: ' + this.contacto.Correo,
    };
    this.http.post(url, datos).subscribe({
      next: (resp) => alert('¡Mensaje enviado con éxito!'),
      error: (err) => alert('Hubo un error al enviar.'),
    });
  }

  presentarExamen(){
    console.log('Navegando a presentar examen...');
    this.router.navigateByUrl('/presentar-examen');
  }
}
