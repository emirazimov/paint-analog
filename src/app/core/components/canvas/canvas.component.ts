import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { CanvasEventListenerServiceService } from "src/app/shared/services/canvas-event-listener-service.service";
import { Shapes } from "./../toolbar/toolbar.component";

@Component({
  selector: "app-canvas",
  templateUrl: "./canvas.component.html",
  styleUrls: ["./canvas.component.scss"],
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild("canvas", { static: true }) myCanvas!: ElementRef;
  // private myCanvas: ElementRef = {} as ElementRef;

  isChecked$: Observable<boolean>;

  canvas: HTMLCanvasElement | null = null;

  context: CanvasRenderingContext2D | null = null;

  isDrawing: boolean = false;

  selectedTool: Shapes | null = null;

  prevMouseX: number = 0;
  prevMouseY: number = 0;

  snapshot: ImageData | null | undefined = null;

  fillColor: boolean = false;

  constructor(
    private store: Store<{
      toolbar: { selectedShape: string; isFillColor: boolean };
    }>
  ) {
    // this.isChecked$ = this.store.pipe(select(selectIsChecked));
  }

  ngAfterViewInit(): void {
    this.canvas = this.myCanvas.nativeElement;
    if (this.canvas) {
      this.context = this.canvas.getContext("2d");

      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    }
  }

  drawRect(e: MouseEvent) {
    this.store.select("toolbar").subscribe((data) => {
      this.fillColor = data.isFillColor;
    });

    if (!this.fillColor) {
      this.context?.strokeRect(
        e.offsetX,
        e.offsetY,
        this.prevMouseX - e.offsetX,
        this.prevMouseY - e.offsetY
      );
    }
    this.context?.fillRect(
      e.offsetX,
      e.offsetY,
      this.prevMouseX - e.offsetX,
      this.prevMouseY - e.offsetY
    );
  }

  drawCircle(e: MouseEvent) {
    this.context?.beginPath();

    let radius = Math.sqrt(
      Math.pow(this.prevMouseX - e.offsetX, 2) +
        Math.pow(this.prevMouseY - e.offsetY, 2)
    );
    this.context?.arc(this.prevMouseX, this.prevMouseY, radius, 0, 2 * Math.PI);

    this.fillColor ? this.context?.fill() : this.context?.stroke();
  }

  startDraw(e: MouseEvent) {
    this.isDrawing = true;
    this.context?.beginPath();

    this.prevMouseX = e.offsetX;
    this.prevMouseY = e.offsetY;

    if (this.canvas) {
      this.snapshot = this.context?.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }
  }

  drawing(event: MouseEvent): void {
    // Handle mouse move event

    if (!this.isDrawing) return;

    if (this.snapshot) this.context?.putImageData(this.snapshot, 0, 0);

    if (this.selectedTool === Shapes.Rectangle) {
      this.drawRect(event);
    } else if (this.selectedTool === Shapes.Circle) {
      this.drawCircle(event);
    }
    this.store.select("toolbar").subscribe((data) => {
      this.selectedTool = data.selectedShape as Shapes;
    });

    console.log(this.selectedTool);
  }
  mouseUp() {
    this.isDrawing = false;
  }
}
