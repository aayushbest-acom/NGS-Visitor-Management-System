import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditLogCard } from './audit-log-card';

describe('AuditLogCard', () => {
  let component: AuditLogCard;
  let fixture: ComponentFixture<AuditLogCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditLogCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditLogCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
