import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CanvasEventListenerServiceService {
  constructor() {}

  onMouseMove(event: MouseEvent): void {
    // Handle mouse move event
    console.log("Mouse position:", event.offsetX, event.offsetY);
    // You can perform further actions based on the mouse position
  }
}
