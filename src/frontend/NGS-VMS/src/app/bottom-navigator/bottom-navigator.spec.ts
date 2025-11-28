import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomNavigator } from './bottom-navigator';

describe('BottomNavigator', () => {
  let component: BottomNavigator;
  let fixture: ComponentFixture<BottomNavigator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomNavigator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomNavigator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
