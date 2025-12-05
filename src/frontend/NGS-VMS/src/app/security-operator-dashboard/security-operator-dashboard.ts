import { Component, signal, WritableSignal } from '@angular/core';
import { HeadLogo } from '../head-logo/head-logo';
import { StatusCard } from "../status-card/status-card";
import { BottomNavigator } from "../bottom-navigator/bottom-navigator";
import { NoDataCard } from '../no-data-card/no-data-card';
import { Visitor } from '../models/visitor';
@Component({
  selector: 'app-security-operator-dashboard',
  imports: [HeadLogo, StatusCard, BottomNavigator, NoDataCard],
  templateUrl: './security-operator-dashboard.html',
  styleUrl: './security-operator-dashboard.css',
})
export class SecurityOperatorDashboard {
  readonly title: string = "Security Operations Center";
  readonly description: string = "Real-time visitor tracking and monitoring";
  readonly securityOperatorIconUri: string = "/ic-security-operator-48.png";
  private visitors: WritableSignal<Array<Visitor>>;
  private restrictedAreaVisitors: WritableSignal<Array<Visitor>>;

  private contractorsList: Array<any>;
  private visitorCardIconUri: string;
  private visitorMessage: string;
  private visitorIconDesc: string;
  private restrictedAreaBackgroundColor: string;
  private restrictedAreaIcon: string;
  private restrictedAreaIconDesc: string;
  private restrictedAreaMessage: string;
  private contractorsIconUri: string;
  private contractorsIconDesc: string;
  private contractorsMessage: string;
  readonly noVisitorMessage: string = "No Active Visitors";
  readonly noContractorMessage: string = "No Visitors in Restricted Area";

  constructor() {
    this.visitors = signal(new Array<Visitor>());
    this.restrictedAreaVisitors = signal(new Array<Visitor>());
    this.restrictedAreaVisitors.set(this.visitors().filter((visitor) => visitor.currentLocation.isRestrictedArea));
    this.contractorsList = new Array<any>();
    this.visitorCardIconUri = '/ic-active-visitor.png';
    this.restrictedAreaBackgroundColor = '#f59e0b';
    this.restrictedAreaIcon = '/ic-restricted-area.png';
    this.visitorMessage = "Active Visitor";
    this.visitorIconDesc = "Active Visitor Icon";
    this.restrictedAreaIconDesc = 'Restricted Area Icon';
    this.restrictedAreaMessage = 'Restricted Area';
    this.contractorsIconUri = '/ic-contractor.png';
    this.contractorsIconDesc = 'Contraactors Icon';
    this.contractorsMessage = 'Contractors';
  }
  get getVisitorsCount() {
    return this.visitors().length;
  }

  get getRestrictedAreaVisitorsCount() {
    return this.restrictedAreaVisitors.length.toString();
  }

  get getContractorsCount() {
    return this.contractorsList.length.toString();
  }

  get getVisitorIcon() {
    return this.visitorCardIconUri;
  }

  get getVisitorMessage() {
    return this.visitorMessage;
  }

  get getVisitorIconDesc() {
    return this.visitorIconDesc;
  }

  get getRestrictedAreaBackgroundColor() {
    return this.restrictedAreaBackgroundColor;
  }

  get getRestrictedAreaIcon() {
    return this.restrictedAreaIcon;
  }

  get getRestrictedAreaIconDesc() {
    return this.restrictedAreaIconDesc;
  }

  get getRestrictedAreaMessage() {
    return this.restrictedAreaMessage;
  }

  get getContractorsIconUri() {
    return this.contractorsIconUri;
  }

  get getContractorsIconDesc() {
    return this.contractorsIconDesc;
  }

  get getContractorsMessage() {
    return this.contractorsMessage;
  }

}
