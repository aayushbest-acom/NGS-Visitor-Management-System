import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityOperatorDashboard } from './security-operator-dashboard';

describe('SecurityOperatorDashboard', () => {
  let component: SecurityOperatorDashboard;
  let fixture: ComponentFixture<SecurityOperatorDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityOperatorDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityOperatorDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
