import { TestBed } from '@angular/core/testing';

import { EmploymentStoryService } from './employment-story.service';

describe('EmploymentStoryService', () => {
  let service: EmploymentStoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmploymentStoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
