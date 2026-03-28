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



}
