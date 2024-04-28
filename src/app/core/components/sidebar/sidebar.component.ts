import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { CanvasEventListenerService } from "src/app/shared/services/canvas-event-listener.service";
import { setRemoveItemFromShapeList } from "src/app/store/toolbar/toolbar.action";
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
    }>,
    private canvasEventListenerService: CanvasEventListenerService,
    private cdr: ChangeDetectorRef
  ) {}
  ngAfterViewInit(): void {
    this.store.select("toolbar").subscribe((data) => {
      this.shapeList = data.shapeList;
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
  
  redrawCanvas(index: number) {
    // Clear the canvas

    this.store.select("toolbar").subscribe((data) => {
      this.context = data.canvas;
    });

    if (this.context) {
      this.canvasEventListenerService.redrawCanvas(this.context, index);
    }

    this.store.dispatch(setRemoveItemFromShapeList({ value: index }));

  }


}
