import { Component, inject, signal, WritableSignal } from '@angular/core';
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

@Component({
  selector: 'app-security-console-dashboard',
  imports: [HeadLogo, Logout, ProfileCard, StatusCard, NoDataCard, VisitorActivityCard],
  templateUrl: './security-console-dashboard.html',
  styleUrl: './security-console-dashboard.css',
})
export class SecurityConsoleDashboard {

  readonly securityOfficerProfile: WritableSignal<Profile>;
  readonly visitors: WritableSignal<Array<Visitor>>;
  readonly noVisitorMessage: string = "No Recent Visitor Activity Yet!";
  readonly router: Router = inject(Router);
  constructor() {
    this.securityOfficerProfile = signal({ id: crypto.randomUUID(), name: 'Officer James Wong', designation: 'Security', department: 'Security Operations', email: 'security@ngs.com.sg', role: Actors.SECURITY_OPERATOR, phone: '+65-XXXX-XXXX' });
    this.visitors = signal(new Array<Visitor>());
  }
  public getCheckedInVisitors(): Array<Visitor> {
    return VisitorUtils.getCheckedInVisitors(this.visitors());
  }
  public getTodayScheduledVisitors(): Array<Visitor> {
    return new Array<Visitor>();
  }

  public getPendingForApprovalVisitors(): Array<Visitor> {
    return VisitorUtils.getVisitorsForPendingApproval(this.visitors());
  }
  public goToSecurityOperatorDashboard(): void {
    this.router.navigate(['security-operator']);
  }
}
