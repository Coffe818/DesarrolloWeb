import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Ticket } from '../../models/tiket.model';
import { TiketService } from '../../service/TiketService.service';
import { AlertService } from '../../service/AlertService.service';

@Component({
  selector: 'app-tiket-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tiket-form.html',
  styleUrl: './tiket-form.css',
})
export class TiketForm {
  ticketService = inject(TiketService);
  alertService = inject(AlertService);

  activeTab: 'nuevo' | 'editar' = 'nuevo';
  ticket: Ticket = new Ticket();
  ticketBusqueda = {
    curp: '',
    turno: ''
  };

  navName = 'Generar Nuevo';

  setActiveTab(tab: 'nuevo' | 'editar') {
    this.activeTab = tab;
  }

  validarTicket() {
    // Validar que todos los campos obligatorios estén completos
    if (!this.ticket.nombre_realiza.trim()) {
      this.alertService.error('El campo "Nombre del que realiza" es obligatorio');
      return false;
    }
    if (!this.ticket.curp.trim() || this.ticket.curp.length !== 18) {
      this.alertService.error('El CURP es obligatorio y debe tener 18 caracteres');
      return false;
    }
    if (!this.ticket.nombre.trim()) {
      this.alertService.error('El campo "Nombre" es obligatorio');
      return false;
    }
    if (!this.ticket.apellido_paterno.trim()) {
      this.alertService.error('El "Apellido Paterno" es obligatorio');
      return false;
    }
    if (!this.ticket.apellido_materno.trim()) {
      this.alertService.error('El "Apellido Materno" es obligatorio');
      return false;
    }
    if (!this.ticket.telefono.trim()) {
      this.alertService.error('El "Teléfono" es obligatorio');
      return false;
    }
    if (!this.ticket.celular.toString().trim() || this.ticket.celular.toString().length < 10) {
      this.alertService.error('El "Celular" es obligatorio');
      return false;
    }
    if (!this.ticket.correo.trim() || !this.isValidEmail(this.ticket.correo)) {
      this.alertService.error('El "Correo" es obligatorio y debe ser válido');
      return false;
    }
    if (!this.ticket.nivel_estudios.trim()) {
      this.alertService.error('El "Nivel de Estudios" es obligatorio');
      return false;
    }
    if (!this.ticket.municipio.trim()) {
      this.alertService.error('El "Municipio" es obligatorio');
      return false;
    }
    if (!this.ticket.asunto.trim()) {
      this.alertService.error('El "Asunto" es obligatorio');
      return false;
    }

    return true;
  }
  guardarTicket() {
    if (!this.validarTicket()) return;

    this.navName = 'Generar Nuevo';
    // Si pasa todas las validaciones, registrar el ticket
    console.log('Ticket a registrar:', this.ticket);
    this.alertService.success('¡Ticket registrado exitosamente!');
    // Resetear el formulario
    this.ticket = new Ticket();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

  }

  // Función auxiliar para validar email
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  consultarTicket() {

    // this.ticketService.TicketGet().subscribe((tickets: Ticket[]) => {
    //   if (tickets.length > 0) {
    //     const ticket = tickets[0];

    //   }

    // });
    this.setActiveTab('nuevo');
    this.navName = 'Editando Ticket ' + this.ticketBusqueda.curp + ' - Turno ' + this.ticketBusqueda.turno;

  }
}
