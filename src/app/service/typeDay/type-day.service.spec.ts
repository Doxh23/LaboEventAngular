import { TestBed } from '@angular/core/testing';

import { TypeDayService } from './type-day.service';

describe('TypeDayService', () => {
  let service: TypeDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
