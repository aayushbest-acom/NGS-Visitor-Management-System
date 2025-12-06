import { Routes } from '@angular/router';
import { Home } from './home/home';
import { SecurityOperatorDashboard } from './security-operator-dashboard/security-operator-dashboard';
import { HostAdminDashboard } from './host-admin-dashboard/host-admin-dashboard';
import { SecurityConsoleDashboard } from './security-console-dashboard/security-console-dashboard';
import { AuditLog } from './audit-log/audit-log';
import { VisitorList } from './visitor-list/visitor-list';
import { ReceptionistDashboard } from './receptionist-dashboard/receptionist-dashboard';
import { VisitorRegistration } from './visitor-registration/visitor-registration';

export const routes: Routes = [{ path: '', component: Home },
{ path: 'security-dashboard', component: SecurityConsoleDashboard, title: 'Security Console Dashboard' },
{ path: 'host-admin-dashboard', component: HostAdminDashboard, title: 'Host Administrator Dashboard' },
{ path: 'audit-logs', component: AuditLog, title: 'Audit Logs' },
{ path: 'visitor-list', component: VisitorList, title: 'Visitor List', pathMatch: 'full' },
{
    path: 'receptionist-dashboard', component: ReceptionistDashboard, title: 'Receptionist Dashboard', pathMatch: 'full', children: [

    ]
}, { path: 'visitor-register', component: VisitorRegistration, title: 'Visitor Registration', pathMatch: 'full' }

];
