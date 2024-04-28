import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";

import { CanvasEventListenerService } from "./shared/services/canvas-event-listener.service";
import { toolbarReducer } from "./store/toolbar/toolbar.reducer";

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ toolbar: toolbarReducer }),
  ],
  providers: [CanvasEventListenerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
