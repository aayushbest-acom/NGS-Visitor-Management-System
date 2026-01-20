import { Injectable } from '@angular/core';
import { Role } from '../models/role.model';
import { Actors } from '../models/actors';
import { UnionType } from 'typescript';
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private _roles: Array<Role>;
  constructor() {
    this._roles = new Array<Role>();
    this.initializeRoles();
  }
  private initializeRoles() {
    const securityOperator: Role = {
      name: 'Security Operator',
      roleType: Actors.SECURITY_OPERATOR,
      description: 'Monitor live visiotrs and access control',
      iconSrcs: ['/ic-security-operator-48.png', '/ic-security-operator-96.png'],
      routeLink: '/login'
    };
    const receptionist: Role = {
      name: 'Receptionist',
      roleType: Actors.RECEPTIONIST,
      description: 'Register visitors and manage check-ins',
      iconSrcs: ['/ic-receptionist-48.png', '/ic-receptionist-96.png'],
      routeLink: '/login'
    };
    const hostOrStaff: Role = {
      name: 'Host/Staff',
      roleType: Actors.HOST,
      description: 'Approve visitors and view appointments',
      iconSrcs: ['/ic-staff-48.png', '/ic-staff-96.png'],
      routeLink: '/login'
    };
    const administrator: Role = {
      name: 'Administrator',
      roleType: Actors.ADMINISTRATOR,
      description: 'Full system access and configuration',
      iconSrcs: ['/ic-administrator-50.png', '/ic-administrator-100.png'],
      routeLink: '/login'
    };
    this._roles.push(securityOperator);
    this._roles.push(receptionist);
    this._roles.push(hostOrStaff);
    this._roles.push(administrator);
  }
  public getRoleIcon(roleType: Actors): string | null {
    const foundRoles = this._roles.filter((role: Role) => role.roleType === roleType);
    console.log(foundRoles);
    if (foundRoles.length === 0) return null;
    return foundRoles[0].iconSrcs[0];
  }
  public getRoleName(roleType: Actors): string | null {
    const foundRoles = this._roles.filter((role: Role) => role.roleType === roleType);
    console.log(foundRoles);
    if (foundRoles.length === 0) return null;
    return foundRoles[0].name;
  }
  public getRoles(): Array<Role> {
    const deepCopyOfRoles = structuredClone(this._roles);
    return deepCopyOfRoles;
  }


}
