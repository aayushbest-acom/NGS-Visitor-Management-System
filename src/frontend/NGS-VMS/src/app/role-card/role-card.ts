import { Component } from '@angular/core';

@Component({
  selector: 'app-role-card',
  imports: [],
  templateUrl: './role-card.html',
  styleUrl: './role-card.css',
})
export class RoleCard {
  roles: Array<Role>;
  constructor() {
    this.roles = new Array<Role>();
    this.initializeRoles();
  }
  private initializeRoles() {
    const securityOperator: Role = {
      name: 'Security Operator',
      description: 'Monitor live visiotrs and access control',
      iconSrcs: ['/ic-security-opeator-48.png', '/ic-security-operator-96.png'],
      routeLink: '/security-dashboard'
    };
    const receptionist: Role = {
      name: 'Receptionist',
      description: 'Register visitors and manage check-ins',
      iconSrcs: ['/ic-receptionist-48.png', '/ic-receptionist-96.png'],
      routeLink: '#'
    };
    const hostOrStaff: Role = {
      name: 'Host/Staff',
      description: 'Approve visitors and view appointments',
      iconSrcs: ['/ic-staff-48.png', '/ic-staff-96.png'],
      routeLink: '/host-admin-dashboard'
    };
    const administrator: Role = {
      name: 'Administrator',
      description: 'Full system access and configuration',
      iconSrcs: ['/ic-administrator-50.png', '/ic-administrator-100.png'],
      routeLink: '#'
    };
    this.roles.push(securityOperator);
    this.roles.push(receptionist);
    this.roles.push(hostOrStaff);
    this.roles.push(administrator);
  }
}
