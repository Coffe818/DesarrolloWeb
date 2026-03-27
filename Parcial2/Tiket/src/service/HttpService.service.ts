import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    apiUrl = environment.API_URL;
    private readonly headers = new HttpHeaders({
        'Accept': 'application/json',
        'User-Agent': 'Custom-Agent'
    });
    constructor(private http: HttpClient) { }

    get<T>(endpoint: string): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}${endpoint}`, { headers: this.headers });
    }

    post<T>(endpoint: string, data: any): Observable<T> {
        return this.http.post<T>(`${this.apiUrl}${endpoint}`, data, { headers: this.headers });
    }

    put<T>(endpoint: string, data: any): Observable<T> {
        return this.http.put<T>(`${this.apiUrl}${endpoint}`, data, { headers: this.headers });
    }

    delete<T>(endpoint: string): Observable<T> {
        return this.http.delete<T>(`${this.apiUrl}${endpoint}`, { headers: this.headers });
    }

}
