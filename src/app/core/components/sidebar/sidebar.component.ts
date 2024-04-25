import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { IInitialState } from "src/app/store/toolbar/toolbar.state";
import { Shapes } from "../toolbar/toolbar.component";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements AfterViewInit {
  // @ViewChild("canvas", { static: true }) myCanvas!: ElementRef;

  constructor(
    private store: Store<{
      toolbar: IInitialState;
    }>
  ) {}
  ngAfterViewInit(): void {
    this.store.select("toolbar").subscribe((data) => {
      this.shapeList = data.shapeList;
      console.log(data.shapeList);
    });

    if (this.canvas) {
      this.context = this.canvas.getContext("2d");

      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    }
  }

  shapeList: String[] = [];

  Shapes = Shapes;

  canvas: HTMLCanvasElement | null = null;

  context: CanvasRenderingContext2D | null = null;

  // deleteShape() {
  //   if (this.context && this.canvas) {
  //     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  //   }
  //   shapeList.forEach((shape) => {
  //     drawShape(ctx, shape);
  //   });
  // }

  drawRectangle(ctx: any, rect: any) {
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  }

  // Function to draw a circle
  drawCircle(ctx: any, circle: any) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
  }

  redrawCanvas() {
    // Clear the canvas

    this.store.select("toolbar").subscribe((data) => {
      this.context = data.canvas;
      console.log(data.canvas);
    });

    if (this.context) {
      console.log("assdfasdf23");

      console.log(this.context);

      const canvas = document.querySelector("canvas");

      if (canvas) {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        const imageData = this.context?.getImageData(
          0,
          0,
          canvas?.width,
          canvas?.height
        );

        // this.context.putImageData(imageData);
      }

      // const;

      // this.context.putImageData();
      // const localStorageShape = JSON.parse(
      //   window.localStorage.getItem("rect") as string
      // );

      // Redraw all shapes
      // shapes.forEach((shape) => {
      // if (shape.type === "rectangle") {
      // this.drawRectangle(this.context, localStorageShape);
      // } else if (shape.type === "circle") {
      // drawCircle(ctx, shape);
      // }
      // });
    }
  }

  // ngOnInit(): void {
  //   this.store.select("toolbar").subscribe((data) => {
  //     this.shapeList = data.shapeList;
  //   });
  // }
}
