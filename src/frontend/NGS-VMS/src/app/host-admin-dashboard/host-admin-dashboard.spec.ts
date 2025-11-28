import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostAdminDashboard } from './host-admin-dashboard';

describe('HostAdminDashboard', () => {
  let component: HostAdminDashboard;
  let fixture: ComponentFixture<HostAdminDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostAdminDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostAdminDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
