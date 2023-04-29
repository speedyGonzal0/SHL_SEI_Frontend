import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import {TableModule} from "primeng/table";
import {RouterLink} from "@angular/router";
import {HistoryRoutingModule} from "./history-routing.module";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import { DiagnosticListComponent } from './diagnostic/diagnostic-list/diagnostic-list.component';
import { DiagnosticDetailsComponent } from './diagnostic/diagnostic-details/diagnostic-details.component';
import { DoctorListComponent } from './doctor/doctor-list/doctor-list.component';
import { DoctorDetailsComponent } from './doctor/doctor-details/doctor-details.component';
import { MedicineDetailsComponent } from './medicine/medicine-details/medicine-details.component';
import { MedicineListComponent } from './medicine/medicine-list/medicine-list.component';
import {CardModule} from "primeng/card";

@NgModule({
  declarations: [
    HistoryComponent,
    DiagnosticListComponent,
    DiagnosticDetailsComponent,
    DoctorListComponent,
    DoctorDetailsComponent,
    MedicineDetailsComponent,
    MedicineListComponent
  ],
  exports: [
    HistoryComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    RouterLink,
    HistoryRoutingModule,
    InputTextModule,
    ButtonModule,
    CardModule
  ]
})
export class HistoryModule { }
