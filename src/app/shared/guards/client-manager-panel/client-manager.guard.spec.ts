import { TestBed } from '@angular/core/testing';

import { ClientManagerGuard } from './client-manager.guard';

describe('ClientManagerGuard', () => {
  let guard: ClientManagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClientManagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
