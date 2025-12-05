import { Component, signal, WritableSignal } from '@angular/core';
import { HeadLogo } from "../head-logo/head-logo";
import { StatusCard } from "../status-card/status-card";
import { ProfileCard } from "../profile-card/profile-card";
import { Profile } from '../models/profile';
import { BottomNavigator } from "../bottom-navigator/bottom-navigator";
import { Visitor } from '@angular/compiler';
import { NoDataCard } from '../no-data-card/no-data-card';
import { Logout } from "../logout/logout";

@Component({
  selector: 'app-host-admin-dashboard',
  imports: [HeadLogo, StatusCard, ProfileCard, BottomNavigator, NoDataCard, Logout],
  templateUrl: './host-admin-dashboard.html',
  styleUrl: './host-admin-dashboard.css',
})
export class HostAdminDashboard {
  readonly hostProfile: Profile = { name: 'Dr.Sarah Chen', department: 'Administrator', designation: 'host', email: '' };
  readonly visitors: WritableSignal<Array<Visitor>>;
  readonly message: string = "No visitor acitivity yet";
  constructor() {
    this.visitors = signal(new Array<Visitor>());
  }

}
