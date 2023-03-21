import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {DoctorModule} from "./doctor/doctor.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DoctorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
