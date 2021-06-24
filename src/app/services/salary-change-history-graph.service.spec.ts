import { TestBed } from '@angular/core/testing';

import { SalaryChangeHistoryGraphService } from './salary-change-history-graph.service';

describe('SalaryChangeHistoryGraphService', () => {
  let service: SalaryChangeHistoryGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryChangeHistoryGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
