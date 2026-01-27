import { Component, effect, inject, signal } from '@angular/core';
import { HeadLogo } from "../head-logo/head-logo";
import { BottomNavigator } from "../bottom-navigator/bottom-navigator";
import { StatusCard } from "../status-card/status-card";
import { Logout } from "../logout/logout";
import { NoDataCard } from "../no-data-card/no-data-card";
import { VisitorActivityCard } from "../visitor-activity-card/visitor-activity-card";
import { ProfileCard } from "../profile-card/profile-card";
import { Visitor } from '../models/visitor';
import { Router, RouterOutlet } from '@angular/router';
import { VisitorService } from '../services/visitor-service';
import { VisitStatus } from '../models/visit-status';

@Component({
  selector: 'app-receptionist-dashboard',
  imports: [HeadLogo, StatusCard, Logout, NoDataCard, VisitorActivityCard, ProfileCard, BottomNavigator],
  templateUrl: './receptionist-dashboard.html',
  styleUrl: './receptionist-dashboard.css',
})
export class ReceptionistDashboard {

  private _visitorService = inject(VisitorService);
  visitors = signal(new Array<Visitor>());
  todaysVisitorCount = signal<string>("");
  checkedInVisitorCount = signal<string>("");
  pendingApprovalVisitorCount = signal<string>("");
  scheduledTodayVisitorCount = signal<string>("");
  router = inject(Router);

  constructor() {
    effect(() => {
      //  this.visitors.set(this._visitorService.getVisitors());
      this.todaysVisitorCount.set(this._visitorService.getVisitors().filter((visitor) => {
        return visitor.visitStatus === VisitStatus.PENDING.toUpperCase() || visitor.visitStatus === VisitStatus.SCHEDULED.toUpperCase() || visitor.visitStatus === VisitStatus.APPROVED.toUpperCase() || visitor.visitStatus === VisitStatus.CHECKED_IN.toUpperCase();
      }).length.toString());

      this.checkedInVisitorCount.set(this._visitorService.getVisitors().filter((visitor) => {
        return visitor.visitStatus === VisitStatus.CHECKED_IN.toUpperCase();
      }).length.toString());

      this.pendingApprovalVisitorCount.set(this._visitorService.getVisitors().filter((visitor) => {
        return visitor.visitStatus === VisitStatus.PENDING.toUpperCase();
      }).length.toString());

      this.scheduledTodayVisitorCount.set(this._visitorService.getVisitors().filter((visitor) => {
        return visitor.visitStatus === VisitStatus.SCHEDULED.toUpperCase();
      }).length.toString());

    });
  }
  registerVisitor() {
    this.router.navigate(['visitor-register']);
  }
  doSelfCheckIn() {
    this.router.navigate(['visitor-self-check-in']);
  }
}
