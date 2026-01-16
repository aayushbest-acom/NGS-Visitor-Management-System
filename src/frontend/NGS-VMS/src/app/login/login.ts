import { Component, computed, inject, input, signal } from '@angular/core';
import { HeadLogo } from "../head-logo/head-logo";
import { ActivatedRoute } from '@angular/router';
import { RoleService } from '../services/role-service';
import { Actors } from '../models/actors';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  imports: [HeadLogo, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private _activatedRoute = inject(ActivatedRoute);
  private _rolesService = inject(RoleService);
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
      this.roleName.update(() => this._rolesService.getRoleName(actor) ?? "");
      this.roleIcon.update(() => this._rolesService.getRoleIcon(actor) ?? "");

    });
  }

  public onLogin() {
    console.log('Form Control Values are: ', this.loginFormGroup.value);
    this.loginFormGroup.markAsUntouched();
    this.loginFormGroup.markAsPristine();
  }
}
