import { map } from 'rxjs';
import { Ticket } from '../models/tiket.model';
import { HttpService } from './HttpService.service';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TiketService {
  private httpService = inject(HttpService);
  constructor() { }

  TicketGet() {
    return this.httpService.get<any>('/api/tickets/').pipe(
      map(response => response.results as Ticket[])
    );
  }
  TicketGetFilter(ticket: Ticket) {
    return this.httpService.get<any>(`/api/tickets/?curp=${ticket.curp}&turno=${ticket.turno}`).pipe(
      map(response => response.results as Ticket[])
    );
  }

  TiketSave(ticket: Ticket) {
    return this.httpService.post<any>('/api/tickets/', ticket).pipe(
      map(response => response as Ticket)
    );;
  }

}
