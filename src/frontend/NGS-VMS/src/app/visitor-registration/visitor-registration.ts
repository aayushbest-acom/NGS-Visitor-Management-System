import { Component, inject, signal } from '@angular/core';
import { Profile } from '../models/profile';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VisitorDialog } from '../visitor-dialog/visitor-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-visitor-registration',
  imports: [VisitorDialog],
  templateUrl: './visitor-registration.html',
  styleUrl: './visitor-registration.css',
})
export class VisitorRegistration {

  hostStaffMembers = signal(new Array<Profile>());
  formBuilder = inject(FormBuilder);
  visitorForm: FormGroup = this.formBuilder.group({
    fullName: ['', Validators.required],
    nationalId: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: [''],
    company: [''],
    hostStaff: ['', Validators.required],
    visitPurpose: ['', Validators.required],
    vehicleNumber: ['']
  });
  dialog = inject(MatDialog);
  registerVisitor() {
    if (this.visitorForm.invalid) {
      this.dialog.open(VisitorDialog, {
        data: {
          title: 'Validation Error',
          message: 'Please fill in all required fields.'
        }
      });
      return;
    }
    this.dialog.open(VisitorDialog, {
      data: {
        title: 'Registration Successful',
        message: 'Visitor has been successfully registered.'
      }
    });

    this.visitorForm.reset();
  }
  selectHost(name: string) {
    this.visitorForm.patchValue({ hostStaff: name });
  }
}
