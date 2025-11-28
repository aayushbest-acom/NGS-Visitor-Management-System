import { Component } from '@angular/core';
import { HeadLogo } from '../head-logo/head-logo';
import { RoleCard } from '../role-card/role-card';
@Component({
  selector: 'app-home',
  imports: [HeadLogo, RoleCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
