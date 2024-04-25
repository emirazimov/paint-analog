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
import {
  setCanvas,
  setRestoreArray,
  setShapeList,
} from "src/app/store/toolbar/toolbar.action";
import { IInitialState } from "src/app/store/toolbar/toolbar.state";
import { Shapes } from "./../toolbar/toolbar.component";

@Component({
  selector: "app-canvas",
  templateUrl: "./canvas.component.html",
  styleUrls: ["./canvas.component.scss"],
})
export class CanvasComponent implements OnInit, AfterViewInit {
  @ViewChild("canvas", { static: true }) myCanvas!: ElementRef;
  // private myCanvas: ElementRef = {} as ElementRef;

  // isChecked$: Observable<boolean>;

  canvas: HTMLCanvasElement | null = null;

  context: CanvasRenderingContext2D | null = null;

  isDrawing: boolean = false;

  selectedTool: Shapes | null = null;

  prevMouseX: number = 0;
  prevMouseY: number = 0;

  snapshot: ImageData | null | undefined = null;

  fillColor: boolean = false;

  color: string | null = null;

  restoreArray: any = null;

  constructor(
    private store: Store<{
      toolbar: IInitialState;
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

  ngOnInit(): void {
    this.store.select("toolbar").subscribe((data) => {
      console.log(data.isFillColor);
      this.fillColor = data.isFillColor;
      this.color = data.color;
    });
  }

  drawRect(e: MouseEvent) {
    this.store.select("toolbar").subscribe((data) => {
      this.fillColor = data.isFillColor;
    });

    if (!this.fillColor) {
      return this.context?.strokeRect(
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

  drawLine(e: MouseEvent) {
    this.context?.beginPath();
    this.context?.moveTo(this.prevMouseX, this.prevMouseY);
    this.context?.lineTo(e.offsetX, e.offsetY);
    this.context?.stroke();

    // [lastX, lastY] = [e.offsetX, e.offsetY];
  }

  startDraw(e: MouseEvent) {
    this.isDrawing = true;

    this.prevMouseX = e.offsetX;
    this.prevMouseY = e.offsetY;

    this.context?.beginPath();

    if (this.context) {
      this.context.strokeStyle = this.color as string;
      this.context.fillStyle = this.color as string;
    }

    if (this.canvas) {
      this.snapshot = this.context?.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }

    console.log(this.selectedTool);
  }

  drawing(event: MouseEvent): void {
    // Handle mouse move event

    if (!this.isDrawing) return;

    if (this.snapshot) this.context?.putImageData(this.snapshot, 0, 0);

    if (this.selectedTool === Shapes.Rectangle) {
      this.drawRect(event);
    } else if (this.selectedTool === Shapes.Circle) {
      this.drawCircle(event);
    } else if (this.selectedTool === Shapes.Line) {
      this.drawLine(event);
    }
    this.store.select("toolbar").subscribe((data) => {
      this.selectedTool = data.selectedShape as Shapes;
    });

    // console.log(this.selectedTool);
  }
  mouseUp(e: MouseEvent) {
    this.isDrawing = false;

    if (this.selectedTool === Shapes.Rectangle) {
      console.log("rectangle");

      this.store.dispatch(setShapeList({ value: Shapes.Rectangle }));
    } else if (this.selectedTool === Shapes.Circle) {
      console.log("circle");
      this.store.dispatch(setShapeList({ value: Shapes.Circle }));
    } else if (this.selectedTool === Shapes.Line) {
      console.log("line");

      this.store.dispatch(setShapeList({ value: Shapes.Line }));
    }

    if (this.canvas) {
      console.log("there is canvas");
      this.store.dispatch(
        setCanvas({ value: this.canvas.getContext("2d") as any })
      );

      const details = this.context?.getImageData(
        0,
        0,
        this.canvas?.width,
        this.canvas?.height
      );

      // window.localStorage.setItem("setRestoreArray", JSON.stringify(details));

      // console.log(details);
      // console.log(window.localStorage.getItem("setRestoreArray"));

      // this.store.dispatch(
      //   setRestoreArray({
      //     value: { ...details },
      //   })
      // );
    }

    this.store.select("toolbar").subscribe((data) => {
      this.restoreArray = data.restoreArray;
    });

    console.log(this.restoreArray);
  }
}
