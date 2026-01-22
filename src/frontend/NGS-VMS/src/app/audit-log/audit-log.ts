import { Component, computed, inject, model, signal } from '@angular/core';
import { HeadLogo } from "../head-logo/head-logo";
import { LogType } from '../models/log-type';
import { StatusCard } from "../status-card/status-card";
import { BottomNavigator } from "../bottom-navigator/bottom-navigator";
import { AuditLogsService } from '../services/audit-logs-service';
import { AuditLogModel } from '../models/audit-log-model';
import { NoDataCard } from "../no-data-card/no-data-card";
import { FormsModule } from '@angular/forms';
import { AuditLogCard } from "../audit-log-card/audit-log-card";

@Component({
  selector: 'app-audit-log',
  imports: [HeadLogo, StatusCard, BottomNavigator, NoDataCard, FormsModule, AuditLogCard],
  templateUrl: './audit-log.html',
  styleUrl: './audit-log.css',
  providers: []
})
export class AuditLog {

  readonly logTypes = signal(Object.values(LogType));
  readonly auditLogs = signal(new Array<AuditLogModel>());
  readonly auditLogService = inject(AuditLogsService);
  currentFilter = signal('');
  searchTerm = model('');
  constructor() {
    this.auditLogs.update(() => this.auditLogService.getAuditLogs());
  }
  searchLog($event: Event) {
    this.auditLogs.update(() => this.auditLogService.getAuditLogs().filter((auditLog) => {
      return auditLog.actor.name === this.searchTerm() || auditLog.target.name === this.searchTerm()
        || auditLog.kind.toString() === this.searchTerm() || auditLog.target.purpose === this.searchTerm() || auditLog.actions.some((action) => action.includes(this.searchTerm()));
    }));
  }

  filterAuditLogs(logType: LogType) {
    this.currentFilter.set(logType);
    this.auditLogs.update(() => this.auditLogService.getAuditLogs().filter((auditLog: AuditLogModel) => auditLog.kind === logType));
  }

}
