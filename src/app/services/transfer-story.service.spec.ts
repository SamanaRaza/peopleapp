import { TestBed } from '@angular/core/testing';

import { TransferStoryService } from './transfer-story.service';

describe('TransferStoryService', () => {
  let service: TransferStoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferStoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
