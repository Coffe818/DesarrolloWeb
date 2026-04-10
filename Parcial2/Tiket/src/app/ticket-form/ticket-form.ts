import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Ticket } from '../../shared/models/ticket.model';
import { TicketService } from '../../shared/service/TicketService.service';
import { AlertService } from '../../shared/service/AlertService.service';
import { MunicipioService } from '../../shared/service/MunicipioService.service';
import { NivelEstudioService } from '../../shared/service/NivelEstudioService.service';
import { UtilService } from '../../shared/service/UtilService.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header';
import { MunicipioSearchComponent } from '../../shared/components/municipio-search/municipio-search';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, MunicipioSearchComponent],
  templateUrl: './ticket-form.html',
  styleUrl: './ticket-form.css',
})
export class TicketForm {
  ticketService = inject(TicketService);
  alertService = inject(AlertService);
  municipioService = inject(MunicipioService);
  nivelService = inject(NivelEstudioService);
  utilService = inject(UtilService);
  cdr = inject(ChangeDetectorRef);
  router = inject(Router);

  activeTab: 'nuevo' | 'editar' = 'nuevo';
  ticket: Ticket = new Ticket();
  ticketBusqueda: Ticket = new Ticket();

  municipiosName = this.municipioService.municipiosNames
  nivelesEstudios = this.nivelService.nivelesEstudios

  editando = false;
  resuelto = false;

  // Variable para el modal de preview (ya no se usa para PDF, pero el modal sigue)
  showPreview = false;

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { ticketToEdit: Ticket };

    if (state?.ticketToEdit) {
      this.ticketBusqueda = state.ticketToEdit;
      this.editando = true;
      this.ticketBusqueda.is_new = false;
      console.log('Ticket recibido para edición:', this.ticketBusqueda);
      this.consultarTicket();
      this.setActiveTab('nuevo');
    }
  }

  setActiveTab(tab: 'nuevo' | 'editar') {
    this.activeTab = tab;
  }
  nuevo() {
    this.ticket = new Ticket();
    this.editando = false;
    this.setActiveTab('nuevo');
  }

  validarTicket() {
    if (!this.ticket.nombre_realiza.trim()) {
      this.alertService.error('El campo "Nombre del que realiza" es obligatorio');
      return false;
    }
    if (!this.ticket.curp.trim()) {
      this.alertService.error('El CURP es obligatorio');
      return false;
    }
    if (!this.utilService.validarCURP(this.ticket.curp)) {
      this.alertService.error('El CURP no es válido');
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
    if (!this.utilService.validarTelefono(this.ticket.telefono)) {
      this.alertService.error('El "Teléfono" no es válido');
      return false;
    }
    if (!this.ticket.celular.toString().trim()) {
      this.alertService.error('El "Celular" es obligatorio');
      return false;
    }
    if (!this.ticket.correo.trim()) {
      this.alertService.error('El "Correo" es obligatorio');
      return false;
    }
    if (!this.utilService.validarEmail(this.ticket.correo)) {
      this.alertService.error('El "Correo" no es válido');
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
    console.log("intentando guardar", this.ticket);

    if (!this.validarTicket()) return;

    this.ticketService.TicketSave(this.ticket).subscribe((response: Ticket) => {
      if (this.editando) {
        this.alertService.success('¡Ticket actualizado exitosamente!');
        this.ticketBusqueda.curp = this.ticket.curp;
        this.ticketBusqueda.turno = response.turno;
        this.consultarTicket();
        return;
      }
      this.alertService.success('¡Ticket registrado exitosamente!');
      this.ticketBusqueda.curp = this.ticket.curp;
      this.ticketBusqueda.turno = response.turno;
      this.utilService.startLoading();
      setTimeout(() => {
        this.utilService.stopLoading();
        this.consultarTicket();
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }, 1000);
    })


  }



  

  imprimirTicket() {
    const t = this.ticket;
    const printContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Ticket #${t.turno}</title>
  <style>
    * { margin: 10px; padding: 0; box-sizing: border-box; }
    body { 
      font-family: Arial, sans-serif; 
      padding: 15px; 
      max-width: 100%; 
      margin: 0 auto;
      font-size: 11px;
    }
    
    h1 { 
      text-align: center; 
      color: #0d6efd; 
      font-size: 16px;
      margin-bottom: 8px;
    }
    
    .hr { 
      border-top: 2px solid #0d6efd; 
      margin: 10px 0; 
    }
    
    .turno { 
      text-align: center; 
      font-size: 32px; 
      font-weight: bold; 
      color: #0d6efd; 
      margin: 15px 0 5px 0;
    }
    
    .turno-label { 
      text-align: center; 
      color: #666; 
      font-size: 10px;
      margin-bottom: 10px;
    }
    
    .field { 
      margin: 6px 0; 
    }
    
    .label { 
      color: #666; 
      font-weight: bold;
    }
    
    .divider { 
      border-top: 1px dashed #ccc; 
      margin: 10px 0; 
    }
    
    .asunto { 
      background: #f5f5f5; 
      padding: 8px; 
      border-radius: 3px; 
      white-space: pre-wrap;
      font-size: 10px;
    }
    
    .footer { 
      text-align: center; 
      color: #666; 
      font-size: 9px; 
      margin-top: 15px;
    }
    
    @page {
      margin: 0.5cm;
      size: auto;
    }
    
    @media print {
      body { 
        padding: 0; 
        margin: 0;
      }
    }
  </style>
</head>
<body onload="setTimeout(function(){ window.print(); window.close(); }, 100);">
  <h1>TICKET DE ATENCIÓN</h1>
  <div class="hr"></div>
  
  <div class="turno-label">TURNO</div>
  <div class="turno">#${t.turno}</div>
  <div class="hr"></div>
  
  <div class="field"><span class="label">Nombre:</span> ${t.nombre} ${t.apellido_paterno} ${t.apellido_materno}</div>
  <div class="field"><span class="label">CURP:</span> ${t.curp}</div>
  <div class="field"><span class="label">Fecha:</span> ${this.fechaActual}</div>
  
  <div class="divider"></div>
  
  <div class="field"><span class="label">Municipio:</span> ${t.municipio || 'No especificado'}</div>
  <div class="field"><span class="label">Nivel Estudios:</span> ${t.nivel_estudios || 'No especificado'}</div>
  
  <div class="divider"></div>
  
  <div class="field"><span class="label">Asunto:</span></div>
  <div class="asunto">${t.asunto || 'No especificado'}</div>
  
  <div class="divider"></div>
  
  <div class="field"><span class="label">Realizado por:</span> ${t.nombre_realiza || 'No especificado'}</div>
  <div class="field"><span class="label">Teléfono:</span> ${t.telefono || 'No especificado'}</div>
  
  <div class="footer">
    Fecha de impresión: ${this.fechaActual} - ${this.horaActual}
  </div>
</body>
</html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
    } else {
      this.alertService.error('No se pudo abrir la ventana de impresión');
    }
  }

  get fechaActual(): string {
    const now = new Date();
    return now.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  get horaActual(): string {
    const now = new Date();
    return now.toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  consultarTicket() {
    if (!this.validarTicketBusqueda()) return;
    this.ticket = new Ticket();

    this.ticketService.TicketGetFilter(this.ticketBusqueda, ['curp', 'turno']).subscribe((tickets: Ticket[]) => {
      if (tickets.length > 0) {

        const ticketEncontrado = tickets[0];
        this.ticket = { ...ticketEncontrado, is_new: false };
        this.resuelto = this.ticket.estatus_ticket === 'RESUELTO';
        console.log('Ticket encontrado:', this.ticket);
        this.alertService.success('¡Ticket encontrado! Puedes editar los datos.');

        // Limpiar búsqueda y cambiar al tab de edición
        this.ticketBusqueda = new Ticket();
        this.setActiveTab('nuevo');
        this.editando = true;

        // Forzar detección de cambios
        this.cdr.detectChanges();

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        // No se encontró el ticket
        this.alertService.error('No se encontró ningún ticket con ese CURP y turno.');
      }
    });
  }


  validarTicketBusqueda() {
    if (!this.ticketBusqueda.curp.trim()) {
      this.alertService.error('El CURP es obligatorio');
      return false;
    }
    if (!this.utilService.validarCURP(this.ticketBusqueda.curp)) {
      this.alertService.error('El CURP no es válido');
      return false;
    }
    if (!this.ticketBusqueda.turno?.toString().trim()) {
      this.alertService.error('El número de turno es obligatorio');
      return false;
    }
    return true;
  }
}