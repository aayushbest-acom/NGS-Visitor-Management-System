import { Component } from '@angular/core';

@Component({
  selector: 'app-head-logo',
  imports: [],
  templateUrl: './head-logo.html',
  styleUrl: './head-logo.css',
})
export class HeadLogo {
  readonly softwareTitle: string = "Visitor Management System";
  readonly softwareDescription: string = "Enterprise Security Platform v2.5";
}
