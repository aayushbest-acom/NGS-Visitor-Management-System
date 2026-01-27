import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { HeadLogo } from "../head-logo/head-logo";
import { StatusCard } from "../status-card/status-card";
import { ProfileCard } from "../profile-card/profile-card";
import { Profile } from '../models/profile';
import { BottomNavigator } from "../bottom-navigator/bottom-navigator";
import { Visitor } from '@angular/compiler';
import { NoDataCard } from '../no-data-card/no-data-card';
import { Logout } from "../logout/logout";
import { Actors } from '../models/actors';
import { VisitStatus } from '../models/visit-status';
import { VisitorService } from '../services/visitor-service';

@Component({
  selector: 'app-host-admin-dashboard',
  imports: [HeadLogo, StatusCard, ProfileCard, BottomNavigator, NoDataCard, Logout],
  templateUrl: './host-admin-dashboard.html',
  styleUrl: './host-admin-dashboard.css',
})
export class HostAdminDashboard {

  private readonly _visitorService = inject(VisitorService);
  readonly hostProfile: Profile = { id: crypto.randomUUID(), name: 'Dr.Sarah Chen', department: 'Administrator', designation: 'host', email: '', role: Actors.HOST, phone: '' };
  readonly visitors: WritableSignal<Array<Visitor>>;
  readonly message: string = "No visitor acitivity yet";
  todaysVisitorCount = signal<string>("");
  checkedInVisitorCount = signal<string>("");
  pendingApprovalVisitorCount = signal<string>("");
  scheduledTodayVisitorCount = signal<string>("");
  constructor() {
    this.visitors = signal(new Array<Visitor>());
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

}
