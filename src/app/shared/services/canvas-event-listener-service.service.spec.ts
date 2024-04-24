import { TestBed } from '@angular/core/testing';

import { CanvasEventListenerServiceService } from './canvas-event-listener-service.service';

describe('CanvasEventListenerServiceService', () => {
  let service: CanvasEventListenerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasEventListenerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
