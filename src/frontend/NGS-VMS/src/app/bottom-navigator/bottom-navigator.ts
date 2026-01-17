import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../services/auth-service';
import { DashboardNavigationService } from '../services/dashboard-navigation-service';
import { Actors } from '../models/actors';

@Component({
  selector: 'app-bottom-navigator',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './bottom-navigator.html',
  styleUrl: './bottom-navigator.css',
})
export class BottomNavigator {
  private _authService = inject(AuthService);
  private _dashboardNavigationService = inject(DashboardNavigationService);
  dashboardLink = '';
  constructor() {
    this.dashboardLink = '/' + this._dashboardNavigationService.getRouteLinkForActor(this._authService.whoLoggedIn());
  }

}
