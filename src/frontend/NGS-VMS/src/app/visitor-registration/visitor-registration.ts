import { Component, inject, signal } from '@angular/core';
import { Profile } from '../models/profile';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VisitorDialog } from '../visitor-dialog/visitor-dialog';
import { MatDialog } from '@angular/material/dialog';
import { HostOrStaffService } from '../services/host-or-staff-service';
import { Actors } from '../models/actors';
import { Visitor } from '../models/visitor';
import { VisitorService } from '../services/visitor-service';
import { VisitStatus } from '../models/visit-status';
import { PremiseLocatonService } from '../services/premise-locaton-service';
import { BottomNavigator } from "../bottom-navigator/bottom-navigator";
@Component({
  selector: 'app-visitor-registration',
  imports: [ReactiveFormsModule, BottomNavigator],
  templateUrl: './visitor-registration.html',
  styleUrl: './visitor-registration.css',
})
export class VisitorRegistration {
  private _hostOrStaffService = inject(HostOrStaffService);
  private _visitorService = inject(VisitorService);
  private _premiseLocationService = inject(PremiseLocatonService);
  hostStaffMembers = signal(new Array<Profile>());
  visitorRegistrationForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    nationalId: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    email: new FormControl(''),
    company: new FormControl(''),
    hostOrStaff: new FormControl<Profile | null>(null, Validators.required),
    purpose: new FormControl('', Validators.required),
    vechicleNumber: new FormControl('')

  });
  selectedHost = signal<Profile>({
    id: '',
    name: '',
    designation: '',
    department: '',
    email: '',
    role: Actors.NONE
  });
  constructor() {
    this.hostStaffMembers.update(() => this._hostOrStaffService.getHostOrStaffList());
  }
  registerVisitor() {
    if (this.visitorRegistrationForm.valid) {
      console.log(this.selectedHost());
      const formValues = this.visitorRegistrationForm.value;
      const visitor: Visitor = {
        id: crypto.randomUUID(),
        name: formValues.fullName ?? "",
        nationalId: formValues.nationalId ?? "",
        email: formValues.email ?? "",
        phoneNumber: formValues.phoneNumber ?? "",
        company: formValues.company ?? "",
        purpose: formValues.purpose ?? "",
        vehicleNumber: formValues.vechicleNumber ?? "",
        status: VisitStatus.PENDING,
        access: '',
        scheduledAt: new Date(),
        checkedInAt: new Date(),
        checkedOutAt: new Date(),
        hostStaffId: this.selectedHost()?.id ?? '',
        currentLocationId: this._premiseLocationService.getDefaultPremiseLocation().id,
      };
      console.log(visitor);
      this._visitorService.addVisitor(visitor);
      alert("Visitor Registration Happened Successfully!");
      this.visitorRegistrationForm.reset();
      this.visitorRegistrationForm.markAsUntouched();
    } else {
      alert("Form Values are not Valid!");
    }
  }
  selectHost(host: Profile) {
    this.selectedHost.update(() => host);
    this.visitorRegistrationForm.patchValue({ hostOrStaff: host });
  }
}
