import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notConnectedGuard } from './not-connected.guard';

describe('notConnectedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => notConnectedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
