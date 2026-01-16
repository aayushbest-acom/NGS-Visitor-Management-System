import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { RoleService } from '../services/role-service';
import { Role } from '../models/role.model';

@Component({
  selector: 'app-role-card',
  imports: [],
  templateUrl: './role-card.html',
  styleUrl: './role-card.css',
})
export class RoleCard {

  roles: Array<Role>;
  router = inject(Router);
  roleService = inject(RoleService);
  constructor() {
    this.roles = this.roleService.getRoles();
  }
  public navigateToLoginRole(role: Role) {
    console.log('navigation role clicked');
    this.router.navigate([role.routeLink], {
      queryParams: {
        roleActor: role.roleType
      }
    });
  }
}
