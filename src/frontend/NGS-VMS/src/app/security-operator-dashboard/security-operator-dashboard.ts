import { Component } from '@angular/core';
import { HeadLogo } from '../head-logo/head-logo';
import { StatusCard } from "../status-card/status-card";
import { ListData } from "../list-data/list-data";
import { BottomNavigator } from "../bottom-navigator/bottom-navigator";

@Component({
  selector: 'app-security-operator-dashboard',
  imports: [HeadLogo, StatusCard, ListData, BottomNavigator],
  templateUrl: './security-operator-dashboard.html',
  styleUrl: './security-operator-dashboard.css',
})
export class SecurityOperatorDashboard {
  readonly title: string = "Security Operations Center";
  readonly description: string = "Real-time visitor tracking and monitoring";
  readonly securityOperatorIconUri: string = "/ic-security-operator-48.png";
  private visitorsList: Array<any>;
  private restrictedAreaVisitorsList: Array<any>;
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

  constructor() {
    this.visitorsList = new Array<any>();
    this.restrictedAreaVisitorsList = new Array<any>();
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
    return this.visitorsList.length.toString();
  }

  get getRestrictedAreaVisitorsCount() {
    return this.restrictedAreaVisitorsList.length.toString();
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
