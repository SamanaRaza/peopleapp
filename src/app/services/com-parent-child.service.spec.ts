import { TestBed } from '@angular/core/testing';

import { ComParentChildService } from './com-parent-child.service';

describe('ComParentChildService', () => {
  let service: ComParentChildService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComParentChildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
