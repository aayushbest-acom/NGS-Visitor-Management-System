import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectToHostComponent } from './connect-to-host.component';

describe('ConnectToHostComponent', () => {
  let component: ConnectToHostComponent;
  let fixture: ComponentFixture<ConnectToHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectToHostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectToHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
