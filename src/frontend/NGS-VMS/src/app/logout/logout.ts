import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.css',
})
export class Logout {
  private _authService = inject(AuthService);
  private _router = inject(Router);
  public performLogout(): void {
    if (this._authService.isLoggedIn()) {
      this._authService.doLogOut();
      this._router.navigate([environment.routeHomeDashboard]);
    }
  }

}
