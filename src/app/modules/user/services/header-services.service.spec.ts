import { TestBed } from '@angular/core/testing';

import { HeaderServicesService } from './header-services.service';

describe('HeaderServicesService', () => {
  let service: HeaderServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
