import { Routes } from '@angular/router';
import { Home } from './home/home';
import { SecurityOperatorDashboard } from './security-operator-dashboard/security-operator-dashboard';
import { HostAdminDashboard } from './host-admin-dashboard/host-admin-dashboard';

export const routes: Routes = [{ path: '', component: Home },
{ path: 'security-dashboard', component: SecurityOperatorDashboard, title: 'Security Operator Dashboard' },
{ path: 'host-admin-dashboard', component: HostAdminDashboard, title: 'Host Administrator Dashboard' }
];
