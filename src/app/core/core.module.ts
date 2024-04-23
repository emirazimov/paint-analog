import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CanvasComponent } from "./components/canvas/canvas.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";

@NgModule({
  declarations: [ToolbarComponent, SidebarComponent, CanvasComponent],
  exports: [ToolbarComponent, SidebarComponent, CanvasComponent],
  imports: [CommonModule],
})
export class CoreModule {}
