import { Component, signal, WritableSignal } from '@angular/core';
import { HeadLogo } from "../head-logo/head-logo";
import { StatusCard } from "../status-card/status-card";
import { ProfileCard } from "../profile-card/profile-card";
import { Profile } from '../profile';
import { BottomNavigator } from "../bottom-navigator/bottom-navigator";
import { Visitor } from '@angular/compiler';
import { NoDataCard } from '../no-data-card/no-data-card';

@Component({
  selector: 'app-host-admin-dashboard',
  imports: [HeadLogo, StatusCard, ProfileCard, BottomNavigator, NoDataCard],
  templateUrl: './host-admin-dashboard.html',
  styleUrl: './host-admin-dashboard.css',
})
export class HostAdminDashboard {
  readonly hostProfile: Profile = { name: 'Dr.Sarah Chen', department: 'Administrator', designation: 'host', email: '' };
  readonly visitors: WritableSignal<Array<Visitor>>;
  constructor() {
    this.visitors = signal(new Array<Visitor>());
  }

}
