import { map } from 'rxjs';
import { HttpService } from './HttpService.service';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private httpService = inject(HttpService);
    constructor() { }

    logIn(usuario: User) {
        return this.httpService.post<any>('/api/auth/login/', usuario).pipe(
            map(response => response.results as User)
        );
    }


}
