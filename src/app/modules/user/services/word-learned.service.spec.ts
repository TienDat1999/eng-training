import { TestBed } from '@angular/core/testing';

import { WordLearnedService } from './word-learned.service';

describe('WordLearnedService', () => {
  let service: WordLearnedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordLearnedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
