import { TestBed } from '@angular/core/testing';

import { ServiceMinesweeperService } from './service-minesweeper.service';

describe('ServiceMinesweeperService', () => {
  let service: ServiceMinesweeperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceMinesweeperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
