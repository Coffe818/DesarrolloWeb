import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Tiket } from '../../models/tiket.model';

@Component({
  selector: 'app-tiket-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tiket-form.html',
  styleUrl: './tiket-form.css',
})
export class TiketForm {
  activeTab: 'nuevo' | 'editar' = 'nuevo';

  tiket: Tiket = new Tiket();

  setActiveTab(tab: 'nuevo' | 'editar') {
    this.activeTab = tab;
  }

  registrarTicket() {
    // Validar que todos los campos obligatorios estén completos
    if (!this.tiket.nombre_realiza.trim()) {
      alert('El campo "Nombre del que realiza" es obligatorio');
      return;
    }
    if (!this.tiket.curp.trim() || this.tiket.curp.length !== 18) {
      alert('El CURP es obligatorio y debe tener 18 caracteres');
      return;
    }
    if (!this.tiket.nombre.trim()) {
      alert('El campo "Nombre" es obligatorio');
      return;
    }
    if (!this.tiket.apellido_paterno.trim()) {
      alert('El "Apellido Paterno" es obligatorio');
      return;
    }
    if (!this.tiket.apellido_materno.trim()) {
      alert('El "Apellido Materno" es obligatorio');
      return;
    }
    if (!this.tiket.telefono.trim()) {
      alert('El "Teléfono" es obligatorio');
      return;
    }
    if (!this.tiket.celular.trim()) {
      alert('El "Celular" es obligatorio');
      return;
    }
    if (!this.tiket.correo.trim() || !this.isValidEmail(this.tiket.correo)) {
      alert('El "Correo" es obligatorio y debe ser válido');
      return;
    }
    if (!this.tiket.nivel_estudios.trim()) {
      alert('El "Nivel de Estudios" es obligatorio');
      return;
    }
    if (!this.tiket.municipio.trim()) {
      alert('El "Municipio" es obligatorio');
      return;
    }
    if (!this.tiket.asunto.trim()) {
      alert('El "Asunto" es obligatorio');
      return;
    }

    // Si pasa todas las validaciones, registrar el ticket
    console.log('Ticket a registrar:', this.tiket);
    alert('¡Ticket registrado exitosamente!');
    // Resetear el formulario
    this.tiket = new Tiket();
  }

  // Función auxiliar para validar email
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
