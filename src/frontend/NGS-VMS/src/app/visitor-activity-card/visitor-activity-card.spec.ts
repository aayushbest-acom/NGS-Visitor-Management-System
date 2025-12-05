import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorActivityCard } from './visitor-activity-card';

describe('VisitorActivityCard', () => {
  let component: VisitorActivityCard;
  let fixture: ComponentFixture<VisitorActivityCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitorActivityCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorActivityCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
