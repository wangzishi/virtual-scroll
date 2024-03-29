import "./polyfills";

import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DemoMaterialModule } from "./material-module";

import { CdkVirtualScrollOverviewExample } from "./app/cdk-virtual-scroll";
import { VscTree } from "./app/vsc-tree";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  // entryComponents: [CdkVirtualScrollOverviewExample, VscTree],
  declarations: [CdkVirtualScrollOverviewExample, VscTree],
  bootstrap: [CdkVirtualScrollOverviewExample, VscTree],
  providers: []
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
