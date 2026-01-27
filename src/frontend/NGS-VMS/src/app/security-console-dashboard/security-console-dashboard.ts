import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { HeadLogo } from "../head-logo/head-logo";
import { Logout } from "../logout/logout";
import { ProfileCard } from "../profile-card/profile-card";
import { Profile } from '../models/profile';
import { StatusCard } from "../status-card/status-card";
import { Visitor } from '../models/visitor';
import { VisitorUtils } from '../utils/visitor-utils';
import { NoDataCard } from "../no-data-card/no-data-card";
import { VisitorActivityCard } from '../visitor-activity-card/visitor-activity-card';
import { ActivatedRoute, Router } from '@angular/router';
import { Actors } from '../models/actors';
import { VisitStatus } from '../models/visit-status';
import { VisitorService } from '../services/visitor-service';

@Component({
  selector: 'app-security-console-dashboard',
  imports: [HeadLogo, Logout, ProfileCard, StatusCard, NoDataCard, VisitorActivityCard],
  templateUrl: './security-console-dashboard.html',
  styleUrl: './security-console-dashboard.css',
})
export class SecurityConsoleDashboard {

  private readonly _visitorService = inject(VisitorService);
  readonly securityOfficerProfile: WritableSignal<Profile>;
  readonly visitors: WritableSignal<Array<Visitor>>;
  readonly noVisitorMessage: string = "No Recent Visitor Activity Yet!";
  todaysVisitorCount = signal<string>("");
  checkedInVisitorCount = signal<string>("");
  pendingApprovalVisitorCount = signal<string>("");
  scheduledTodayVisitorCount = signal<string>("");
  readonly router: Router = inject(Router);
  constructor() {
    this.securityOfficerProfile = signal({ id: crypto.randomUUID(), name: 'Officer James Wong', designation: 'Security', department: 'Security Operations', email: 'security@ngs.com.sg', role: Actors.SECURITY_OPERATOR, phone: '+65-XXXX-XXXX' });
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
  public goToSecurityOperatorDashboard(): void {
    this.router.navigate(['security-operator']);
  }
}
