import { TestBed } from '@angular/core/testing';

import { TranslateVnService } from './translate-vn.service';

describe('TranslateVnService', () => {
  let service: TranslateVnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateVnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
