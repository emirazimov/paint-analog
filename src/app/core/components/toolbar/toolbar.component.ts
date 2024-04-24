import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  setIsFillColor,
  setSelectedShape,
} from "src/app/store/toolbar/toolbar.action";
import { setIsFillColor } from "./../../../store/toolbar/toolbar.action";

export enum Shapes {
  Rectangle = "rectangle",
  Circle = "circle",
  Line = "line",
}

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent {
  constructor(
    private store: Store<{
      toolbar: { selectedShape: string; isFillColor: boolean };
    }>
  ) {}

  public colors: Array<{ colorName: string; colorHex: string }> = [
    {
      colorName: "red-500",
      colorHex: "#EF4444",
    },
    {
      colorName: "orange-500",
      colorHex: "#F97316",
    },
    {
      colorName: "yellow-400",
      colorHex: "#FACC15",
    },
    {
      colorName: "green-400",
      colorHex: "#4ADE80",
    },
    {
      colorName: "teal-400",
      colorHex: "#2DD4BF",
    },
    {
      colorName: "blue-500",
      colorHex: "#3B82F6",
    },
    {
      colorName: "indigo-500",
      colorHex: "#6366F1",
    },
    {
      colorName: "pink-500",
      colorHex: "#EC4899",
    },
    {
      colorName: "rose-500",
      colorHex: "#F43F5E",
    },
    {
      colorName: "fuchsia-500",
      colorHex: "#D946EF",
    },
    {
      colorName: "violet-500",
      colorHex: "#8B5CF6",
    },
    {
      colorName: "lightBlue-500",
      colorHex: "#0EA5E9",
    },
    {
      colorName: "emerald-500",
      colorHex: "#10B981",
    },
    {
      colorName: "lime-500",
      colorHex: "#84CC16",
    },
  ];

  public shapes = [
    { shapeName: Shapes.Rectangle, isActive: false },
    { shapeName: Shapes.Circle, isActive: false },
    { shapeName: Shapes.Line, isActive: false },
  ];

  fillColor: boolean = false;

  onShapeClick(shapeName: Shapes) {
    this.shapes.forEach((e) => {
      if (e.shapeName === shapeName) {
        e.isActive = true;
      } else {
        e.isActive = false;
      }
    });

    this.store.dispatch(setSelectedShape({ value: shapeName }));
  }

  onFillColorClick(event: Event) {
    console.log(event);
    this.store.dispatch(setIsFillColor());
  }

  getIsChecked() {
    return this.store.select("toolbar").subscribe((data) => {
      this.fillColor = data.isFillColor;
    });
  }
}
