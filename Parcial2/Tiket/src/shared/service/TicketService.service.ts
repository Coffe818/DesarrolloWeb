import { computed, inject, Injectable, signal } from '@angular/core';
import { Ticket } from '../models/ticket.model';
import { HttpService } from './HttpService.service';
import { UtilService } from './UtilService.service';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs';

interface PaginatedResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Ticket[];
}

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private httpService = inject(HttpService);
  private utilService = inject(UtilService);

  private _tickets = signal<Ticket[]>([]);
  private _currentPage = signal<number>(1);
  private _totalPages = signal<number>(1);
  private _totalCount = signal<number>(0);

  public tickets = computed(() => this._tickets());
  public currentPage = computed(() => this._currentPage());
  public totalPages = computed(() => this._totalPages());
  public totalCount = computed(() => this._totalCount());

  constructor() {
    this.cargarTickets(1);
  }

  cargarTickets(page: number = 1, filtros?: { ticket_id?: string, turno?: number, curp?: string, nombre?: string, municipio?: string, nivel_estudios?: string, estatus_ticket?: string }) {
    let url = `/api/tickets/?page=${page}`;
    
    // Agregar filtros a la URL si existen
    const params: string[] = [];
    if (filtros?.ticket_id) params.push(`ticket_id=${filtros.ticket_id}`);
    if (filtros?.turno) params.push(`turno=${filtros.turno}`);
    if (filtros?.curp) params.push(`curp=${filtros.curp}`);
    if (filtros?.nombre) params.push(`nombre=${filtros.nombre}`);
    if (filtros?.municipio) params.push(`municipio=${filtros.municipio}`);
    if (filtros?.nivel_estudios) params.push(`nivel_estudios=${filtros.nivel_estudios}`);
    if (filtros?.estatus_ticket) params.push(`estatus_ticket=${filtros.estatus_ticket}`);
    
    if (params.length > 0) {
      url += '&' + params.join('&');
    }

    this.httpService.get<PaginatedResponse>(url).pipe(
      tap({
        next: (data) => {
          this._tickets.set(data.results);
          this._currentPage.set(page);
          this._totalCount.set(data.count);
          const totalPages = Math.ceil(data.count / 25);
          this._totalPages.set(totalPages);
        },
        error: (err) => {
          console.error('Error al cargar tickets', err);
        }
      })
    ).subscribe();
  }

  reloadTickets() {
    this.cargarTickets(this._currentPage());
  }

  goToPage(page: number) {
    if (page < 1 || page > this._totalPages()) return;
    this.cargarTickets(page);
  }

  nextPage() {
    if (this._currentPage() < this._totalPages()) {
      this.cargarTickets(this._currentPage() + 1);
    }
  }

  prevPage() {
    if (this._currentPage() > 1) {
      this.cargarTickets(this._currentPage() - 1);
    }
  }

  TicketGetFilter(ticket: Ticket, campos: string[]) {
    const queryParams = this.utilService.buildQueryParams(ticket, campos);
    return this.httpService.get<any>(`/api/tickets/${queryParams}`).pipe(
      map(response => response.results as Ticket[])
    );
  }

  TicketSave(ticket: Ticket) {
    if (ticket.is_new) {
      console.log('Guardando nuevo ticket:', ticket);
      return this.httpService.post<any>('/api/tickets/', ticket).pipe(
        map(response => response as Ticket)
      );
    } else {
      console.log('Actualizando ticket existente:', ticket);
      const body = this.utilService.buildBody(ticket, ['curp', 'turno', 'nombre_realiza', 'nombre', 'apellido_paterno', 'apellido_materno', 'telefono', 'celular', 'correo', 'nivel_estudios', 'municipio', 'asunto', 'estatus_ticket']);
      return this.httpService.put<any>(`/api/tickets/${ticket.ticket_id}/`, body).pipe(
        map(response => response as Ticket)
      );
    }
  }

  TicketGestionar(ticket: Ticket) {
    const ticketEnvio: Ticket = { ...ticket };
    ticketEnvio.estatus_ticket = 'RESUELTO';
    const body = this.utilService.buildBody(ticketEnvio, ['estatus_ticket']);
    return this.httpService.patch<any>(`/api/tickets/${ticket.ticket_id}/`, body, true).pipe(
      map(response => response as Ticket)
    );
  }

  TicketDelete(ticketId: number) {
    return this.httpService.delete<any>(`/api/tickets/${ticketId}/`, true);
  }
}
