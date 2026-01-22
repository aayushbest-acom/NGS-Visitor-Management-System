import { TestBed } from '@angular/core/testing';

import { PassportReaderService } from './passport-reader-service';

describe('PassportReaderService', () => {
  let service: PassportReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassportReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
