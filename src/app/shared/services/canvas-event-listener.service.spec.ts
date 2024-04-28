import { TestBed } from "@angular/core/testing";

import { CanvasEventListenerService } from "./canvas-event-listener.service";

describe("CanvasEventListenerService", () => {
  let service: CanvasEventListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasEventListenerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
