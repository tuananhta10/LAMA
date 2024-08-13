import { TestBed } from '@angular/core/testing';

import { AdminSkillsService } from './admin-skills.service';

describe('AdminSkillsService', () => {
  let service: AdminSkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSkillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
