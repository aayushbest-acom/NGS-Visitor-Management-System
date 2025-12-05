import { Injectable, signal } from '@angular/core';
import { AuditLogModel } from '../models/audit-log-model';

@Injectable({
  providedIn: 'root',
})
export class AuditLogsService {
  private auditLogsData = signal(new Array<AuditLogModel>());
  public getAuditLogs(): Array<AuditLogModel> {
    return this.auditLogsData();
  }
}
