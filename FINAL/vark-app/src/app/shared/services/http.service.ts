import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, Observable } from 'rxjs';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl = (import.meta as any).env.NG_APP_BACKEND_URL;
  utilService = inject(UtilService);
  token = signal<string | null>(null);


  private getHeaders(useToken: boolean): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    if (useToken) {
      headers = headers.set('Authorization', this.token() || '');
    }

    return headers;
  }

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, useToken = false): Observable<T> {
    this.utilService.startLoading();

    return this.http.get<T>(`${this.apiUrl}${endpoint}/`, { headers: this.getHeaders(useToken) }).pipe(
      catchError((error) => {
        this.utilService.handleError(error);
        throw error;
      }),
      finalize(() => {
        this.utilService.stopLoading();
      })
    );
  }

  post<T>(endpoint: string, data: any, useToken = false): Observable<T> {
    this.utilService.startLoading();
    return this.http
      .post<T>(`${this.apiUrl}${endpoint}/`, data, { headers: this.getHeaders(useToken) })
      .pipe(
        catchError((error) => {
          this.utilService.handleError(error);
          throw error;
        }),
        finalize(() => {
          this.utilService.stopLoading();
        })
      );
  }

  put<T>(endpoint: string, data: any, useToken = false): Observable<T> {
    this.utilService.startLoading();
    return this.http
      .put<T>(`${this.apiUrl}${endpoint}/`, data, { headers: this.getHeaders(useToken) })
      .pipe(
        catchError((error) => {
          this.utilService.handleError(error);
          throw error;
        }),
        finalize(() => {
          this.utilService.stopLoading();
        })
      );
  }

  delete<T>(endpoint: string, useToken = false): Observable<T> {
    this.utilService.startLoading();
    return this.http
      .delete<T>(`${this.apiUrl}${endpoint}/`, { headers: this.getHeaders(useToken) })
      .pipe(
        catchError((error) => {
          this.utilService.handleError(error);
          throw error;
        }),
        finalize(() => {
          this.utilService.stopLoading();
        })
      );
  }

  patch<T>(endpoint: string, data: any, useToken = false): Observable<T> {
    this.utilService.startLoading();
    return this.http
      .patch<T>(`${this.apiUrl}${endpoint}/`, data, { headers: this.getHeaders(useToken) })
      .pipe(
        catchError((error) => {
          this.utilService.handleError(error);
          throw error;
        }),
        finalize(() => {
          this.utilService.stopLoading();
        })
      );
  }
}
