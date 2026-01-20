import { inject, Injectable } from '@angular/core';
import { Actors } from '../models/actors';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DashboardNavigationService {
  private _router = inject(Router);

  public routeNavigationHelper(actor: Actors) {
    switch (actor) {
      case Actors.RECEPTIONIST:
        this._router.navigate([environment.routeReceptionistDashboard]);
        break;
      case Actors.SECURITY_OPERATOR:
        this._router.navigate([environment.routeSecurityOperatorDashboard]);
        break;
      case Actors.HOST:
        this._router.navigate([environment.routeHostAdminDashboard]);
        break;
      default:
        break;
    }
  }
  public getRouteLinkForActor(actor: Actors | null): string {
    switch (actor) {
      case Actors.RECEPTIONIST:
        return environment.routeReceptionistDashboard;
      case Actors.SECURITY_OPERATOR:
        return environment.routeSecurityOperatorDashboard;
      case Actors.HOST:
        return environment.routeHostAdminDashboard;
      default:
        return '';
    }
  }
}
