import { TestBed } from '@angular/core/testing';

import { AuthGuardForLoggedInService } from './auth-guard-for-logged-in.service';

describe('AuthGuardForLoggedInService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardForLoggedInService = TestBed.get(AuthGuardForLoggedInService);
    expect(service).toBeTruthy();
  });
});
