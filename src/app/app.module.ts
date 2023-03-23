import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {AuthenticationModule} from "./authentication/authentication.module";

import {DoctorModule} from "./doctor/doctor.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    DoctorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
