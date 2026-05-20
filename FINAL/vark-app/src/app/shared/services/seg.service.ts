import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const segGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.token()) {
    return true;
  }

  return router.parseUrl('/login');
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.token() && authService.esAdmin()) {
    return true;
  }

  if (authService.token()) {
    return router.parseUrl('/historial');
  }

  return router.parseUrl('/login');
};
