import { Component } from "@angular/core";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent {
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
}
