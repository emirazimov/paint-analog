import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { CanvasEventListenerServiceService } from "./shared/services/canvas-event-listener-service.service";
import { toolbarReducer } from "./store/toolbar/toolbar.reducer";

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ toolbar: toolbarReducer }),
  ],
  providers: [CanvasEventListenerServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
