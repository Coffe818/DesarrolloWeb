import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, finalize, Observable } from 'rxjs';
import { AlertService } from './AlertService.service';
import { UtilService } from './UtilService.service';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    private apiUrl = environment.API_URL;
    private alertService = inject(AlertService);
    private utilService = inject(UtilService);


    private getHeaders(useToken: boolean): HttpHeaders {
        let headers = new HttpHeaders({
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': 'true'
        });

        if (useToken) {
            const userJson = localStorage.getItem('user');
            const authToken = userJson ? JSON.parse(userJson).token : null;

            if (authToken) {
                headers = headers.set('X-Admin-Token', authToken);
            }
        }

        return headers;
    }


    constructor(private http: HttpClient) { }

    get<T>(endpoint: string, useToken = false): Observable<T> {
        this.utilService.startLoading();
        return this.http.get<T>(`${this.apiUrl}${endpoint}`, { headers: this.getHeaders(useToken) }).pipe(
            catchError(error => {
                this.alertService.error(error.error?.error || error.message);
                throw error;
            }),
            finalize(() => this.utilService.stopLoading())
        );
    }

    post<T>(endpoint: string, data: any, useToken = false): Observable<T> {
        this.utilService.startLoading();
        return this.http.post<T>(`${this.apiUrl}${endpoint}`, data, { headers: this.getHeaders(useToken) }).pipe(
            catchError(error => {
                this.alertService.error(error.error?.error || error.message);
                throw error;
            }),
            finalize(() => this.utilService.stopLoading())
        );
    }


    put<T>(endpoint: string, data: any, useToken = false): Observable<T> {
        this.utilService.startLoading();
        return this.http.put<T>(`${this.apiUrl}${endpoint}`, data, { headers: this.getHeaders(useToken) }).pipe(
            catchError(error => {
                this.alertService.error(error.error?.error || error.message);
                throw error;
            }),
            finalize(() => this.utilService.stopLoading())

        );
    }

    delete<T>(endpoint: string, useToken = false): Observable<T> {
        this.utilService.startLoading();
        return this.http.delete<T>(`${this.apiUrl}${endpoint}`, { headers: this.getHeaders(useToken) }).pipe(
            catchError(error => {
                this.alertService.error(error.error?.error || error.message);
                throw error;
            }),
            finalize(() => this.utilService.stopLoading())
        );
    }

    patch<T>(endpoint: string, data: any, useToken = false): Observable<T> {
        this.utilService.startLoading();
        return this.http.patch<T>(`${this.apiUrl}${endpoint}`, data, { headers: this.getHeaders(useToken) }).pipe(
            catchError(error => {
                this.alertService.error(error.error?.error || error.message);
                throw error;
            }),
            finalize(() => this.utilService.stopLoading())
        );
    }

}
