import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadLogo } from './head-logo';

describe('HeadLogo', () => {
  let component: HeadLogo;
  let fixture: ComponentFixture<HeadLogo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadLogo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadLogo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
