import { HttpClient, HttpHeaders } from '@angular/common/http';
import he from '@angular/common/locales/he';
import { inject, Injectable } from '@angular/core';
import { catchError, finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl = (import.meta as any).env.NG_APP_BACKEND_URL;

  private getHeaders(useToken: boolean): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    if (useToken) {
      const userJson = localStorage.getItem('user');
      const authToken = userJson ? JSON.parse(userJson).token : null;

      if (authToken) {
        headers = headers.set('Authorization', authToken);
      }
    }

    return headers;
  }

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, useToken = false): Observable<T> {

    return this.http.get<T>(`${this.apiUrl}${endpoint}/`, { headers: this.getHeaders(useToken) }).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  post<T>(endpoint: string, data: any, useToken = false): Observable<T> {
    return this.http
      .post<T>(`${this.apiUrl}${endpoint}/`, data, { headers: this.getHeaders(useToken) })
      .pipe(
        catchError((error) => {
          throw error;
        }),
      );
  }

  put<T>(endpoint: string, data: any, useToken = false): Observable<T> {
    return this.http
      .put<T>(`${this.apiUrl}${endpoint}/`, data, { headers: this.getHeaders(useToken) })
      .pipe(
        catchError((error) => {
          throw error;
        }),
      );
  }

  delete<T>(endpoint: string, useToken = false): Observable<T> {
    return this.http
      .delete<T>(`${this.apiUrl}${endpoint}/`, { headers: this.getHeaders(useToken) })
      .pipe(
        catchError((error) => {
          throw error;
        }),
      );
  }

  patch<T>(endpoint: string, data: any, useToken = false): Observable<T> {
    return this.http
      .patch<T>(`${this.apiUrl}${endpoint}/`, data, { headers: this.getHeaders(useToken) })
      .pipe(
        catchError((error) => {
          throw error;
        }),
      );
  }
}
