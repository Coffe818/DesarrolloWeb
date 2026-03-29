import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { catchError, finalize, Observable } from 'rxjs';
import { AlertService } from './AlertService.service';
import { UtilService } from './UtilService.service';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    apiUrl = environment.API_URL;
    private alertService = inject(AlertService);
    utilService = inject(UtilService);

    private readonly headers = new HttpHeaders({
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true'
    });
    constructor(private http: HttpClient) { }

    get<T>(endpoint: string): Observable<T> {
        this.utilService.startLoading();
        return this.http.get<T>(`${this.apiUrl}${endpoint}`, { headers: this.headers }).pipe(
            catchError(error => {
                this.alertService.error(error.message);
                throw error;
            }),
            finalize(() => this.utilService.stopLoading())
        );
    }

    post<T>(endpoint: string, data: any): Observable<T> {
        this.utilService.startLoading();
        return this.http.post<T>(`${this.apiUrl}${endpoint}`, data, { headers: this.headers }).pipe(
            catchError(error => {
                this.alertService.error(error.message);
                throw error;
            }),
            finalize(() => this.utilService.stopLoading())

        );
    }

    put<T>(endpoint: string, data: any): Observable<T> {
        this.utilService.startLoading();
        return this.http.put<T>(`${this.apiUrl}${endpoint}`, data, { headers: this.headers }).pipe(
            catchError(error => {
                this.alertService.error(error.message);
                throw error;
            }),
            finalize(() => this.utilService.stopLoading())

        );
    }

    delete<T>(endpoint: string): Observable<T> {
        this.utilService.startLoading();
        return this.http.delete<T>(`${this.apiUrl}${endpoint}`, { headers: this.headers }).pipe(
            catchError(error => {
                this.alertService.error(error.message);
                throw error;
            }),
            finalize(() => this.utilService.stopLoading())

        );
    }

}
