import { map, Observable } from 'rxjs';
import { HttpService } from './HttpService.service';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UtilService } from './UtilService.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private utilService = inject(UtilService);

    private httpService = inject(HttpService);
    router: Router = inject(Router);

    constructor() { }

    logIn(usuario: User): Observable<boolean> {
        const user = this.utilService.buildBody(usuario, ['nombre_usuario', 'contrasena']);

        return this.httpService.post<any>('/api/auth/login/', user).pipe(
            map(response => {
                const userData = response as User;
                if (userData && userData.token) {
                    localStorage.setItem('user', JSON.stringify(userData));
                    return true;
                }
                return false;
            })
        );
    }
    logout() {
        localStorage.removeItem('user');
        this.router.navigate(['/']);
    }


}
