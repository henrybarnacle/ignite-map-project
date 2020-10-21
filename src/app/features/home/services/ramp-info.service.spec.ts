import { TestBed } from '@angular/core/testing';

import { RampInfoService } from './ramp-info.service';

describe('RampInfoService', () => {
  let service: RampInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RampInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
