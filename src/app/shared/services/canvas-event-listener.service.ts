import { Injectable, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Shapes } from "src/app/core/components/toolbar/toolbar.component";
import {
  setCanvas,
  setRestoreArray,
  setShapeList,
} from "src/app/store/toolbar/toolbar.action";
import { IInitialState } from "src/app/store/toolbar/toolbar.state";

@Injectable({
  providedIn: "root",
})
export class CanvasEventListenerService implements OnInit {
  constructor(
    private store: Store<{
      // private readonly context: CanvasRenderingContext2D,
      toolbar: IInitialState;
    }>
  ) {}

  isDrawing: boolean = false;

  fillColor: boolean = false;

  color: string | null = null;

  prevMouseX: number = 0;
  prevMouseY: number = 0;

  snapshot: ImageData | null | undefined = null;

  selectedTool: Shapes | null = null;

  restoreArray: any[] = [];

  ngOnInit(): void {
    this.store.select("toolbar").subscribe((data) => {
      this.fillColor = data.isFillColor;
      this.color = data.color;
    });
  }

  drawRect(e: MouseEvent, context: CanvasRenderingContext2D) {
    this.store.select("toolbar").subscribe((data) => {
      this.fillColor = data.isFillColor;
    });

    if (!this.fillColor) {
      return context?.strokeRect(
        e.offsetX,
        e.offsetY,
        this.prevMouseX - e.offsetX,
        this.prevMouseY - e.offsetY
      );
    }
    context?.fillRect(
      e.offsetX,
      e.offsetY,
      this.prevMouseX - e.offsetX,
      this.prevMouseY - e.offsetY
    );
  }

  drawRectTouch(e: TouchEvent, context: CanvasRenderingContext2D) {
    this.store.select("toolbar").subscribe((data) => {
      this.fillColor = data.isFillColor;
    });

    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    if (!this.fillColor) {
      return context?.strokeRect(
        x,
        y,
        this.prevMouseX - x,
        this.prevMouseY - y
      );
    }
    context?.fillRect(x, y, this.prevMouseX - x, this.prevMouseY - y);
  }

  drawCircle(e: MouseEvent, context: CanvasRenderingContext2D) {
    context?.beginPath();

    let radius = Math.sqrt(
      Math.pow(this.prevMouseX - e.offsetX, 2) +
        Math.pow(this.prevMouseY - e.offsetY, 2)
    );
    context?.arc(this.prevMouseX, this.prevMouseY, radius, 0, 2 * Math.PI);

    this.fillColor ? context?.fill() : context?.stroke();
  }

  drawCircleTouch(e: TouchEvent, context: CanvasRenderingContext2D) {
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    context?.beginPath();

    let radius = Math.sqrt(
      Math.pow(this.prevMouseX - x, 2) + Math.pow(this.prevMouseY - y, 2)
    );
    context?.arc(this.prevMouseX, this.prevMouseY, radius, 0, 2 * Math.PI);

    this.fillColor ? context?.fill() : context?.stroke();
  }

  drawLine(e: MouseEvent, context: CanvasRenderingContext2D) {
    context?.beginPath();
    context?.moveTo(this.prevMouseX, this.prevMouseY);
    context?.lineTo(e.offsetX, e.offsetY);
    context?.stroke();
  }

  drawLineTouch(e: TouchEvent, context: CanvasRenderingContext2D) {
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    context?.beginPath();
    context?.moveTo(this.prevMouseX, this.prevMouseY);
    context?.lineTo(x, y);
    context?.stroke();
  }

  startDraw(
    e: MouseEvent,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    this.isDrawing = true;

    this.prevMouseX = e.offsetX;
    this.prevMouseY = e.offsetY;

    context?.beginPath();

    if (context) {
      this.store.select("toolbar").subscribe((data) => {
        this.color = data.color;
      });

      context.strokeStyle = this.color as string;
      context.fillStyle = this.color as string;
    }

    if (canvas) {
      this.snapshot = context?.getImageData(0, 0, canvas.width, canvas.height);
    }
  }

  touchStart(
    e: TouchEvent,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    this.isDrawing = true;

    // this.prevMouseX = e.offsetX;
    // this.prevMouseY = e.offsetY;

    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    context?.beginPath();

    if (context) {
      this.store.select("toolbar").subscribe((data) => {
        this.color = data.color;
      });

      context.strokeStyle = this.color as string;
      context.fillStyle = this.color as string;
    }

    if (canvas) {
      this.snapshot = context?.getImageData(0, 0, canvas.width, canvas.height);
    }
  }

  drawing(event: MouseEvent, context: CanvasRenderingContext2D): void {
    // Handle mouse move event
    if (!this.isDrawing) return;
    if (this.snapshot) context?.putImageData(this.snapshot, 0, 0);

    this.store.select("toolbar").subscribe((data) => {
      this.selectedTool = data.selectedShape as Shapes;
    });

    if (this.selectedTool === Shapes.Rectangle) {
      this.drawRect(event, context);
    } else if (this.selectedTool === Shapes.Circle) {
      this.drawCircle(event, context);
    } else if (this.selectedTool === Shapes.Line) {
      this.drawLine(event, context);
    }
    this.store.select("toolbar").subscribe((data) => {
      this.selectedTool = data.selectedShape as Shapes;
    });
  }

  touchMove(e: TouchEvent, context: CanvasRenderingContext2D) {
    if (!this.isDrawing) return;
    if (this.snapshot) context?.putImageData(this.snapshot, 0, 0);

    this.store.select("toolbar").subscribe((data) => {
      this.selectedTool = data.selectedShape as Shapes;
    });

    if (this.selectedTool === Shapes.Rectangle) {
      this.drawRectTouch(e, context);
    } else if (this.selectedTool === Shapes.Circle) {
      this.drawCircleTouch(e, context);
    } else if (this.selectedTool === Shapes.Line) {
      this.drawLineTouch(e, context);
    }
    this.store.select("toolbar").subscribe((data) => {
      this.selectedTool = data.selectedShape as Shapes;
    });
  }

  mouseUp(
    e: MouseEvent,
    canvas: HTMLCanvasElement,
    restoreArray: any[],
    context: CanvasRenderingContext2D
  ) {
    this.isDrawing = false;

    if (this.selectedTool === Shapes.Rectangle) {
      this.store.dispatch(setShapeList({ value: Shapes.Rectangle }));
    } else if (this.selectedTool === Shapes.Circle) {
      this.store.dispatch(setShapeList({ value: Shapes.Circle }));
    } else if (this.selectedTool === Shapes.Line) {
      this.store.dispatch(setShapeList({ value: Shapes.Line }));
    }

    if (canvas) {
      this.store.dispatch(setCanvas({ value: canvas.getContext("2d") as any }));

      const details = context?.getImageData(
        0,
        0,
        canvas?.width,
        canvas?.height
      );

      this.restoreArray.push(details);
    }

    this.store.select("toolbar").subscribe((data) => {
      restoreArray = data.restoreArray;
    });
  }

  touchEnd(
    e: TouchEvent,
    canvas: HTMLCanvasElement,
    restoreArray: any[],
    context: CanvasRenderingContext2D
  ) {
    this.isDrawing = false;

    if (this.selectedTool === Shapes.Rectangle) {
      this.store.dispatch(setShapeList({ value: Shapes.Rectangle }));
    } else if (this.selectedTool === Shapes.Circle) {
      this.store.dispatch(setShapeList({ value: Shapes.Circle }));
    } else if (this.selectedTool === Shapes.Line) {
      this.store.dispatch(setShapeList({ value: Shapes.Line }));
    }

    if (canvas) {
      this.store.dispatch(setCanvas({ value: canvas.getContext("2d") as any }));

      const details = context?.getImageData(
        0,
        0,
        canvas?.width,
        canvas?.height
      );

      this.restoreArray.push(details);
    }

    this.store.select("toolbar").subscribe((data) => {
      restoreArray = data.restoreArray;
    });
  }

  redrawCanvas(context: CanvasRenderingContext2D, index: number) {
    if (context) {
      const canvas = document.querySelector("canvas");

      context.putImageData(this.restoreArray[index], 0, 0);
    }
  }
  // redrawCanvas() {}
}
