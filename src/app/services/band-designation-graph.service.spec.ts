import { TestBed } from '@angular/core/testing';

import { BandDesignationGraphService } from './band-designation-graph.service';

describe('BandDesignationGraphService', () => {
  let service: BandDesignationGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BandDesignationGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
