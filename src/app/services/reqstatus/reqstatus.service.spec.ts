import { TestBed } from '@angular/core/testing';

import { ReqstatusService } from './reqstatus.service';

describe('ReqstatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReqstatusService = TestBed.get(ReqstatusService);
    expect(service).toBeTruthy();
  });
});
