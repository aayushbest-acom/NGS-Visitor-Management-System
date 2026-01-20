import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { Actors } from '../models/actors';

export const homeNavigationGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return !authService.isLoggedIn() || authService.whoLoggedIn() == Actors.NONE;
};
