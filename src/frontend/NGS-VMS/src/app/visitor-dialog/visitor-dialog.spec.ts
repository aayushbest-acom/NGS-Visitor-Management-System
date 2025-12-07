import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorDialog } from './visitor-dialog';

describe('VisitorDialog', () => {
  let component: VisitorDialog;
  let fixture: ComponentFixture<VisitorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitorDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
