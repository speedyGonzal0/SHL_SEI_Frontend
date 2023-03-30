import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {AuthenticationModule} from "@authentication/authentication.module";
import {DiagnosticsModule} from "@diagnostics/diagnostics.module";
import {DoctorModule} from "@doctor/doctor.module";
import {OrgModule} from "@org/org.module";
import {PatientModule} from "@patient/patient.module";
import {AppRoutingModule} from "./app-routing.module";
import {MedicineModule} from "@medicine/medicine.module";
import {HomeModule} from "@home/home.module";
import {HttpClientModule} from "@angular/common/http";

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
    MedicineModule,
    HomeModule,
    OrgModule,
    PatientModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
