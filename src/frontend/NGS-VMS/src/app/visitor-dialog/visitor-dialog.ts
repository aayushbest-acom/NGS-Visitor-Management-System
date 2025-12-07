import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-visitor-dialog',
  imports: [MatDialogModule],
  templateUrl: './visitor-dialog.html',
  styleUrl: './visitor-dialog.css',
  providers: []
})
export class VisitorDialog {
  data = inject(MAT_DIALOG_DATA);
}
