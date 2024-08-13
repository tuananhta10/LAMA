import { TestBed } from '@angular/core/testing';

import { AdminGenderService } from './admin-gender.service';

describe('AdminGenderService', () => {
  let service: AdminGenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
