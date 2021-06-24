import { TestBed } from '@angular/core/testing';

import { PerformanceHistoryService } from './performance-history.service';

describe('PerformanceHistoryService', () => {
  let service: PerformanceHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformanceHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
