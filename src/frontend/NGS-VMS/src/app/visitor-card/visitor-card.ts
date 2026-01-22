import { Component, effect, Host, inject, input, signal } from '@angular/core';
import { Visitor } from '../models/visitor';
import { VisitStatus } from '../models/visit-status';
import { IdMaskingPipePipe } from '../pipes/id-masking-pipe-pipe';
import { TitleCasePipe } from '@angular/common';
import { HostOrStaffHelper } from '../helpers/host-or-staff-helper';
import { Profile } from '../models/profile';
import { ConnectToHostComponent } from '../connect-to-host/connect-to-host.component';
@Component({
  selector: 'app-visitor-card',
  imports: [IdMaskingPipePipe, TitleCasePipe, ConnectToHostComponent],
  templateUrl: './visitor-card.html',
  styleUrl: './visitor-card.css',
})
export class VisitorCard {
  visitor = input<Visitor>();
  hostOrStaffs = input<Array<Profile>>([]);
  hostOrStaff = signal<Profile | null>(null);
  readonly VISITOR_STATUS_PENDING = VisitStatus.PENDING;
  constructor() {
    effect(() => {
      this.hostOrStaff.set(HostOrStaffHelper.getHostOrStaffById(this.visitor()?.hostStaffId ?? '', this.hostOrStaffs()));
    });

  }
  public getHostOrStaffInfo(): string | null {

    return this.hostOrStaff() ? HostOrStaffHelper.formatHostOrStaffDataById(this.hostOrStaff()) : null;

  }
}
