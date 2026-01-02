import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfCheckIn } from './self-check-in';

describe('SelfCheckIn', () => {
  let component: SelfCheckIn;
  let fixture: ComponentFixture<SelfCheckIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelfCheckIn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfCheckIn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
