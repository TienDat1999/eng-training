import { TestBed } from '@angular/core/testing';

import { WordTopicsService } from './word-topics.service';

describe('WordTopicsService', () => {
  let service: WordTopicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordTopicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
