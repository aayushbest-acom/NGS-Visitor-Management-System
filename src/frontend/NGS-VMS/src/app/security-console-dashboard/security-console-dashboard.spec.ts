import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityConsoleDashboard } from './security-console-dashboard';

describe('SecurityConsoleDashboard', () => {
  let component: SecurityConsoleDashboard;
  let fixture: ComponentFixture<SecurityConsoleDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityConsoleDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityConsoleDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
