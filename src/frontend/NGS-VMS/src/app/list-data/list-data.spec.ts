import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListData } from './list-data';

describe('ListData', () => {
  let component: ListData;
  let fixture: ComponentFixture<ListData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
