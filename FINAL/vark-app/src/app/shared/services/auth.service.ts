import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * Mock login implementation. In a real app this would call the backend API.
   * Succeeds for emails ending with @example.com and password length >= 6.
   */
  login(email: string, password: string, remember: boolean): Observable<{ success: boolean; token?: string; message?: string }> {
    const ok = !!email && !!password && password.length >= 6 && email.endsWith('@example.com');
    const response = ok
      ? { success: true, token: 'mock-token' as string }
      : { success: false, message: 'Credenciales inválidas' as string };

    return of(response).pipe(
      delay(500),
      tap(res => {
        if (res.success && res.token) {
          localStorage.setItem('authToken', res.token!);
        }
        if (remember && res.success) {
          localStorage.setItem('rememberedEmail', email);
        }
      })
    );
  }
}
