import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfKiosk } from './self-kiosk';

describe('SelfKiosk', () => {
  let component: SelfKiosk;
  let fixture: ComponentFixture<SelfKiosk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelfKiosk]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfKiosk);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
