import { DatePipe } from '@angular/common';
import { Component, input, signal, Version } from '@angular/core';
import { AuditLogModel } from '../models/audit-log-model';

@Component({
  selector: 'app-audit-log-card',
  imports: [DatePipe],
  templateUrl: './audit-log-card.html',
  styleUrl: './audit-log-card.css',
})
export class AuditLogCard {
  readonly auditLog = input.required<AuditLogModel>();
  constructor() {

  }
}
