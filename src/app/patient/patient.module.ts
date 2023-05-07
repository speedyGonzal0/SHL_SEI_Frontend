import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import {PatientRegistrationComponent} from "./patient-registration/patient-registration.component";
import { PatientListComponent } from './patient-list/patient-list.component';

import {ChipsModule} from 'primeng/chips';
import {ChipModule} from 'primeng/chip';
import {TagModule} from 'primeng/tag';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import { DividerModule } from 'primeng/divider';
import {PatientRoutingModule} from "@patient/patient-routing.module";
import {ToastModule} from "primeng/toast";
import {CardModule} from "primeng/card";

@NgModule({
  declarations: [
    PatientRegistrationComponent,
    PatientListComponent
  ],
  exports: [
    PatientListComponent,
  ],
  imports: [
    CommonModule,
    ChipsModule,
    ChipModule,
    TagModule,
    ButtonModule,
    DropdownModule,
    TableModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    DividerModule,
    PatientRoutingModule,
    ToastModule,
    CardModule
  ]
})
export class PatientModule { }
