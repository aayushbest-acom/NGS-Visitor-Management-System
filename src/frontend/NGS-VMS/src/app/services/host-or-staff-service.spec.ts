import { TestBed } from '@angular/core/testing';

import { HostOrStaffService } from './host-or-staff-service';

describe('HostOrStaffService', () => {
  let service: HostOrStaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostOrStaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
