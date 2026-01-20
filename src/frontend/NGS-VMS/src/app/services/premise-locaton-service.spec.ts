import { TestBed } from '@angular/core/testing';

import { PremiseLocatonService } from './premise-locaton-service';

describe('PremiseLocatonService', () => {
  let service: PremiseLocatonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PremiseLocatonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
