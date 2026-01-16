import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-self-check-in',
  imports: [ReactiveFormsModule],
  templateUrl: './self-check-in.html',
  styleUrl: './self-check-in.css',
})
export class SelfCheckIn {
  private readonly location = inject(Location);
  navigateBack() {
    this.location.back();
  }

}
