import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from '../../shared/service/TicketService.service';
import { Ticket } from '../../shared/models/ticket.model';
import { AlertService } from '../../shared/service/AlertService.service';
import { MunicipioService } from '../../shared/service/MunicipioService.service';
import { NivelEstudioService } from '../../shared/service/NivelEstudioService.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header';



@Component({
  selector: 'app-admin-tickets',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent],
  templateUrl: './admin-tickets.html',
  styleUrl: './admin-tickets.css'
})
export class AdminTickets implements OnInit {

  ticketService = inject(TicketService);
  alertService = inject(AlertService);
  router = inject(Router);
  municipioService = inject(MunicipioService);
  nivelService = inject(NivelEstudioService);
  municipiosName = this.municipioService.municipiosNames
  nivelesEstudios = this.nivelService.nivelesEstudios

  ticketsList: Ticket[] = [];
  filterTicket: Ticket = new Ticket();

  ngOnInit() {
    this.filterTicket.estatus_ticket = ''
    this.filterTicket.ticket_id = undefined
    this.filterTicket.turno = undefined
    this.buscarTickets();
  }


  buscarTickets() {
    const campos = ['ticket_id', 'turno', 'curp', 'nombre', 'municipio', 'nivel_estudios', 'estatus_ticket'];
    this.ticketService.TicketGetFilter(this.filterTicket, campos).subscribe({
      next: (tickets) => {
        this.ticketsList = [...tickets];

      },
      error: (err) => {
        this.alertService.error('Error al cargar los tickets: ' + err.message);
      }
    });
  }

  resetFilters() {
    this.filterTicket = new Ticket()
    this.filterTicket.estatus_ticket = ''
    this.filterTicket.ticket_id = undefined
    this.filterTicket.turno = undefined
    this.buscarTickets();
  }

  editTicket(ticket: Ticket) {
    this.router.navigate(['/crear-ticket'], {
      state: { ticketToEdit: ticket }
    });
  }

  gestionarTicket(ticket: Ticket) {
    this.ticketService.TicketGestionar(ticket).subscribe({
      next: (response) => {
        this.alertService.success(`Ticket ${response.ticket_id} gestionado exitosamente.`);
        this.buscarTickets();
      },
      error: (err) => {
        this.alertService.error('Error al gestionar el ticket: ' + err.message);
      }
    });
  }

  deleteTicket(ticket: Ticket) {
    this.alertService.confirm('Confirmar eliminación', `¿Estás seguro de que deseas eliminar el ticket de ${ticket.nombre} con CURP ${ticket.curp}?`).then(confirmed => {
      if (confirmed) {
        this.ticketService.TicketDelete(ticket.ticket_id!).subscribe({
          next: () => {
            this.alertService.success(`Ticket ${ticket.ticket_id} eliminado exitosamente.`);
            this.buscarTickets();
          },
          error: (err) => {
            this.alertService.error('Error al eliminar el ticket: ' + err.message);
          }
        });
      }
    });
  }
}
