import { TestBed } from '@angular/core/testing';

import { CrawWordsService } from './craw-words.service';

describe('CrawWordsService', () => {
  let service: CrawWordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrawWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
