import { Injectable, signal } from '@angular/core';
import { AuditLogModel } from '../models/audit-log-model';

@Injectable({
  providedIn: 'root',
})
export class AuditLogsService {
  private _auditLogsData = signal(new Array<AuditLogModel>());
  constructor() {

  }
  public getAuditLogs(): Array<AuditLogModel> {
    return this._auditLogsData();
  }

}
