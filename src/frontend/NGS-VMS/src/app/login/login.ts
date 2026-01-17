import { Component, computed, inject, input, signal } from '@angular/core';
import { HeadLogo } from "../head-logo/head-logo";
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../services/role-service';
import { Actors } from '../models/actors';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from '../services/auth-service';
import { environment } from '../../environments/environment.development';
import { DashboardNavigationService } from '../services/dashboard-navigation-service';

@Component({
  selector: 'app-login',
  imports: [HeadLogo, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private _activatedRoute = inject(ActivatedRoute);
  private _rolesService = inject(RoleService);
  private _authService = inject(AuthService);
  private _dashboardNavigationService = inject(DashboardNavigationService);
  private _roleType = signal<Actors>(Actors.NONE);
  roleName = signal<string>('Role-Name');
  roleIcon = signal<string>('Role-Icon');
  loginFormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor() {
    console.log("hello login!");

    this._activatedRoute.queryParams.subscribe((params) => {
      console.log('params:', params);
      const actor = Number(params['roleActor']) as Actors;
      this._roleType.update(() => actor);
      this.roleName.update(() => this._rolesService.getRoleName(actor) ?? "");
      this.roleIcon.update(() => this._rolesService.getRoleIcon(actor) ?? "");

    });
  }

  public onLogin() {
    console.log('Form Control Values are: ', this.loginFormGroup.value);
    const loggedIn = this._authService.doLogIn(this._roleType(), this.loginFormGroup.value.username ?? null, this.loginFormGroup.value.password ?? null);
    if (loggedIn) {
      this._dashboardNavigationService.routeNavigationHelper(this._roleType());
      this.loginFormGroup.markAsUntouched();
      this.loginFormGroup.markAsPristine();
    }
  }

}
