import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { homeNavigationGuardGuard } from './home-navigation-guard-guard';

describe('homeNavigationGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => homeNavigationGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
