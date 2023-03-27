import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import {PatientRegistrationComponent} from "./patient-registration/patient-registration.component";

import {CardModule} from 'primeng/card';
import {ChipsModule} from 'primeng/chips';
import {ChipModule} from 'primeng/chip';
import {TagModule} from 'primeng/tag';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import { DividerModule } from 'primeng/divider';
import { PatientListComponent } from './patient-list/patient-list.component';

@NgModule({
  declarations: [
    PatientRegistrationComponent,
    PatientListComponent
  ],
  exports: [
    PatientRegistrationComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ChipsModule,
    ChipModule,
    TagModule,
    ButtonModule,
    DropdownModule,
    TableModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    DividerModule
  ]
})
export class PatientModule { }
