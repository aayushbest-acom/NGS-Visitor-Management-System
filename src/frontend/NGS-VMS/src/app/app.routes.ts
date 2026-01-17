import { Routes } from '@angular/router';
import { Home } from './home/home';
import { SecurityOperatorDashboard } from './security-operator-dashboard/security-operator-dashboard';
import { HostAdminDashboard } from './host-admin-dashboard/host-admin-dashboard';
import { SecurityConsoleDashboard } from './security-console-dashboard/security-console-dashboard';
import { AuditLog } from './audit-log/audit-log';
import { VisitorList } from './visitor-list/visitor-list';
import { ReceptionistDashboard } from './receptionist-dashboard/receptionist-dashboard';
import { VisitorRegistration } from './visitor-registration/visitor-registration';
import { SelfCheckIn } from './self-check-in/self-check-in';
import { Login } from './login/login';
import { authenticationGuard } from './guards/authentication-guard';
import { environment } from '../environments/environment.development';

export const routes: Routes = [{ path: '', component: Home },
{
    path: environment.routeSecurityConsoleDashboard, component: SecurityConsoleDashboard, title: 'Security Console Dashboard', canActivate: [authenticationGuard]
},
{ path: environment.routeSecurityOperatorDashboard, component: HostAdminDashboard, title: 'Host Administrator Dashboard', canActivate: [authenticationGuard] },
{ path: 'audit-logs', component: AuditLog, title: 'Audit Logs' },
{ path: 'visitor-list', component: VisitorList, title: 'Visitor List', pathMatch: 'full' },
{
    path: environment.routeReceptionistDashboard, component: ReceptionistDashboard, title: 'Receptionist Dashboard', pathMatch: 'full', canActivate: [authenticationGuard]
},
{ path: 'visitor-register', component: VisitorRegistration, title: 'Visitor Registration', pathMatch: 'full' },
{ path: 'visitor-self-check-in', component: SelfCheckIn, title: 'Self Check In', pathMatch: 'full' },
{ path: environment.routeSecurityOperatorDashboard, component: SecurityOperatorDashboard, title: 'Security Operator Dashboard', canActivate: [authenticationGuard] },
{ path: 'login', component: Login }
];  
