import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {AuthenticationModule} from "@authentication/authentication.module";
import {DiagnosticsModule} from "@diagnostics/diagnostics.module";

import {DoctorModule} from "./doctor/doctor.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    DiagnosticsModule,
    DoctorModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
