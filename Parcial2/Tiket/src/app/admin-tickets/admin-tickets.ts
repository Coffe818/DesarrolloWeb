import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from '../../shared/service/TicketService.service';
import { Ticket } from '../../shared/models/ticket.model';
import { AlertService } from '../../shared/service/AlertService.service';
import { NivelEstudioService } from '../../shared/service/NivelEstudioService.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header';
import { MunicipioSearchComponent } from '../../shared/components/municipio-search/municipio-search';

@Component({
  selector: 'app-admin-tickets',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, MunicipioSearchComponent],
  templateUrl: './admin-tickets.html',
  styleUrl: './admin-tickets.css'
})
export class AdminTickets {
  ticketService = inject(TicketService);
  alertService = inject(AlertService);
  router = inject(Router);
  nivelService = inject(NivelEstudioService);
  
  nivelesEstudios = this.nivelService.nivelesEstudios;

  // Signals de paginación del servicio
  currentPage = computed(() => this.ticketService.currentPage());
  totalPages = computed(() => this.ticketService.totalPages());
  totalCount = computed(() => this.ticketService.totalCount());

  // Signals para filtros
  filterTicketId = signal<string>('');
  filterTurno = signal<string>('');
  filterCurp = signal<string>('');
  filterNombre = signal<string>('');
  filterMunicipio = signal<string>('');
  filterNivelEstudios = signal<string>('');
  filterEstatusTicket = signal<string>('');

  // Lista de tickets del servicio
  ticketsList = computed(() => this.ticketService.tickets());

  buscarTickets() {
    const filtros = {
      ticket_id: this.filterTicketId(),
      turno: this.filterTurno() ? Number(this.filterTurno()) : undefined,
      curp: this.filterCurp(),
      nombre: this.filterNombre(),
      municipio: this.filterMunicipio(),
      nivel_estudios: this.filterNivelEstudios(),
      estatus_ticket: this.filterEstatusTicket()
    };
    this.ticketService.cargarTickets(1, filtros);
  }

  resetFilters() {
    this.filterTicketId.set('');
    this.filterTurno.set('');
    this.filterCurp.set('');
    this.filterNombre.set('');
    this.filterMunicipio.set('');
    this.filterNivelEstudios.set('');
    this.filterEstatusTicket.set('');
    this.ticketService.cargarTickets(1);
  }

  editTicket(ticket: Ticket) {
    this.router.navigate(['/crear-ticket'], {
      state: { ticketToEdit: ticket }
    });
  }

  gestionarTicket(ticket: Ticket) {
    this.ticketService.TicketGestionar(ticket).subscribe({
      next: () => {
        this.alertService.success(`Ticket ${ticket.ticket_id} gestionado exitosamente.`);
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

  // Navegación de paginación
  goToPage(page: number) {
    const filtros = {
      ticket_id: this.filterTicketId(),
      turno: this.filterTurno() ? Number(this.filterTurno()) : undefined,
      curp: this.filterCurp(),
      nombre: this.filterNombre(),
      municipio: this.filterMunicipio(),
      nivel_estudios: this.filterNivelEstudios(),
      estatus_ticket: this.filterEstatusTicket()
    };
    this.ticketService.cargarTickets(page, filtros);
  }

  nextPage() {
    const filtros = {
      ticket_id: this.filterTicketId(),
      turno: this.filterTurno() ? Number(this.filterTurno()) : undefined,
      curp: this.filterCurp(),
      nombre: this.filterNombre(),
      municipio: this.filterMunicipio(),
      nivel_estudios: this.filterNivelEstudios(),
      estatus_ticket: this.filterEstatusTicket()
    };
    this.ticketService.cargarTickets(this.currentPage() + 1, filtros);
  }

  prevPage() {
    const filtros = {
      ticket_id: this.filterTicketId(),
      turno: this.filterTurno() ? Number(this.filterTurno()) : undefined,
      curp: this.filterCurp(),
      nombre: this.filterNombre(),
      municipio: this.filterMunicipio(),
      nivel_estudios: this.filterNivelEstudios(),
      estatus_ticket: this.filterEstatusTicket()
    };
    this.ticketService.cargarTickets(this.currentPage() - 1, filtros);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const total = this.totalPages();
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }
}
