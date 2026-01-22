import { Component, effect, inject, model, signal } from '@angular/core';
import { BottomNavigator } from "../bottom-navigator/bottom-navigator";
import { NoDataCard } from "../no-data-card/no-data-card";
import { FormsModule } from '@angular/forms';
import { HeadLogo } from "../head-logo/head-logo";
import { VisitStatus } from '../models/visit-status';
import { Visitor } from '../models/visitor';
import { VisitorService } from '../services/visitor-service';
import { VisitorCard } from "../visitor-card/visitor-card";
import { HostOrStaffService } from '../services/host-or-staff-service';
import { Profile } from '../models/profile';
import { HostOrStaffHelper } from '../helpers/host-or-staff-helper';

@Component({
  selector: 'app-visitor-list',
  imports: [FormsModule, BottomNavigator, HeadLogo, NoDataCard, VisitorCard],
  templateUrl: './visitor-list.html',
  styleUrl: './visitor-list.css',
  providers: []
})
export class VisitorList {
  readonly currentFilter = signal('');
  readonly searchTerm = model("");
  readonly visitStatus = signal<string[]>(Object.values(VisitStatus));
  readonly visitors = signal(new Array<Visitor>());
  private readonly _hostOrStaffs = signal(new Array<Profile>());
  public hostOrStaffs = this._hostOrStaffs.asReadonly();
  private readonly _visitorService = inject(VisitorService);
  private readonly _hostOrStaffService = inject(HostOrStaffService);
  constructor() {
    effect(() => {
      this.visitors.set(this._visitorService.getVisitors());
      this._hostOrStaffs.set(this._hostOrStaffService.getHostOrStaffList());
    });
  }

  searchVisitor($event: Event) {
    this.visitors.set(this._visitorService.getVisitors().filter((visitor: Visitor) => {
      return (
        visitor.name.includes(this.searchTerm()) ||
        visitor.nationalId.includes(this.searchTerm()) ||
        visitor.purpose.includes(this.searchTerm()) ||
        visitor.passNumber?.includes(this.searchTerm()) ||
        visitor.specialInstructions?.includes(this.searchTerm()) ||
        visitor.checkedInAt.toString().includes(this.searchTerm()) ||
        visitor.checkedOutAt.toString().includes(this.searchTerm()) ||
        visitor.hostStaffId === HostOrStaffHelper.getHostOrStaffIdByName(this.searchTerm(), this.hostOrStaffs()) ||
        visitor.hostStaffId === HostOrStaffHelper.getHostOrStaffIdByPhone(this.searchTerm(), this.hostOrStaffs())
      );
    }));
    if (!this.searchTerm()) {
      this.visitors.set(this._visitorService.getVisitors());
    }
  }

  filterVisitorsByStatus(statusType: string) {
    this.currentFilter.set(statusType);
    if (statusType === VisitStatus._ALL) {
      this.visitors.set(this._visitorService.getVisitors());
    } else {
      this.visitors.set(this._visitorService.getVisitors().filter((visitor: Visitor) =>
        visitor.visitStatus === statusType.toUpperCase()
      ));
    }

  }

}
