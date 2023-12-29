import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isadminGuard } from './isadmin.guard';

describe('isadminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isadminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
