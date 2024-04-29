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
// import { CanvasEventListenerServiceService } from "src/app/shared/services/canvas-event-listener-service.service";
import { CanvasEventListenerService } from "src/app/shared/services/canvas-event-listener.service";
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
export class CanvasComponent implements AfterViewInit {
  @ViewChild("canvas", { static: true }) myCanvas!: ElementRef;
  // private myCanvas: ElementRef = {} as ElementRef;

  // isChecked$: Observable<boolean>;

  canvas: HTMLCanvasElement | null = null;

  context: CanvasRenderingContext2D | null = null;

  selectedTool: Shapes | null = null;

  // prevMouseX: number = 0;
  // prevMouseY: number = 0;

  // snapshot: ImageData | null | undefined = null;

  // fillColor: boolean = false;

  // color: string | null = null;

  restoreArray: any = null;

  constructor(
    private store: Store<{
      toolbar: IInitialState;
    }>,
    private canvasEventListenerService: CanvasEventListenerService
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

  startDraw(e: MouseEvent) {
    if (this.canvas && this.context) {
      this.canvasEventListenerService.startDraw(e, this.canvas, this.context);
    }
  }

  drawing(e: MouseEvent): void {
    // Handle mouse move event

    if (this.context) {
      this.canvasEventListenerService.drawing(e, this.context);
    }
  }
  mouseUp(e: MouseEvent) {
    if (this.canvas && this.context) {
      this.canvasEventListenerService.mouseUp(
        e,
        this.canvas,
        this.restoreArray,
        this.context
      );
    }
  }

  touchStart(e: TouchEvent) {
    if (this.canvas && this.context) {
      this.canvasEventListenerService.touchStart(e, this.canvas, this.context);
    }
  }

  touchMove(e: TouchEvent) {
    if (this.context) {
      this.canvasEventListenerService.touchMove(e, this.context);
    }
  }

  touchEnd(e: TouchEvent) {
    if (this.canvas && this.context) {
      this.canvasEventListenerService.touchEnd(
        e,
        this.canvas,
        this.restoreArray,
        this.context
      );
    }
  }
}
