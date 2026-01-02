import { Component, inject, signal } from '@angular/core';
import { HeadLogo } from "../head-logo/head-logo";
import { BottomNavigator } from "../bottom-navigator/bottom-navigator";
import { StatusCard } from "../status-card/status-card";
import { Logout } from "../logout/logout";
import { NoDataCard } from "../no-data-card/no-data-card";
import { VisitorActivityCard } from "../visitor-activity-card/visitor-activity-card";
import { ProfileCard } from "../profile-card/profile-card";
import { Visitor } from '../models/visitor';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-receptionist-dashboard',
  imports: [HeadLogo, StatusCard, Logout, NoDataCard, VisitorActivityCard, ProfileCard, BottomNavigator],
  templateUrl: './receptionist-dashboard.html',
  styleUrl: './receptionist-dashboard.css',
})
export class ReceptionistDashboard {

  visitors = signal(new Array<Visitor>());
  router = inject(Router);
  registerVisitor() {
    this.router.navigate(['visitor-register']);
  }
  doSelfCheckIn() {
    this.router.navigate(['visitor-self-check-in']);
  }
}
