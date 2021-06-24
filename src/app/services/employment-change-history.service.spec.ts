import { TestBed } from '@angular/core/testing';

import { EmploymentChangeHistoryService } from './employment-change-history.service';

describe('EmploymentChangeHistoryService', () => {
  let service: EmploymentChangeHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmploymentChangeHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
