import { map } from 'rxjs';
import { Ticket } from '../models/ticket.model';
import { HttpService } from './HttpService.service';
import { inject, Injectable } from '@angular/core';
import { UtilService } from './UtilService.service';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private httpService = inject(HttpService);
  private utilService = inject(UtilService);
  constructor() { }

  TicketGet() {
    return this.httpService.get<any>('/api/tickets/').pipe(
      map(response => response.results as Ticket[])
    );
  }
  TicketGetFilter(ticket: Ticket, campos: string[]) {
    const queryParams = this.utilService.buildQueryParams(ticket, campos);
    return this.httpService.get<any>(`/api/tickets/${queryParams}`).pipe(
      map(response => response.results as Ticket[])
    );
  }

  TicketSave(ticket: Ticket) {
    return this.httpService.post<any>('/api/tickets/', ticket).pipe(
      map(response => response as Ticket)
    );;
  }

  TicketGestionar(ticket: Ticket) {
    const ticketEnvio: Ticket = { ...ticket };
    ticketEnvio.estatus_ticket = 'RESUELTO';
    const body = this.utilService.buildBody(ticketEnvio, ['estatus_ticket']);
    return this.httpService.patch<any>(`/api/tickets/${ticket.ticket_id}/`, body, true).pipe(
      map(response => response as Ticket)
    );;
  }

  TicketDelete(ticketId: number,) {
    return this.httpService.delete<any>(`/api/tickets/${ticketId}/`, true);
  }

}
