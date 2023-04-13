import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { DoctorRegistrationComponent } from '@doctor/doctor-registration/doctor-registration.component';
import {DoctorListComponent} from "@doctor/doctor-list/doctor-list.component";
import { DoctorProfileComponent } from '@doctor/doctor-profile/doctor-profile.component';

import {CardModule} from 'primeng/card';
import {ChipsModule} from 'primeng/chips';
import {ChipModule} from 'primeng/chip';
import { TagModule  } from 'primeng/tag';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import { DividerModule } from 'primeng/divider';
import {RouterLink} from "@angular/router";
import {DoctorRoutingModule} from "@doctor/doctor-routing.module";
import {AutoCompleteModule} from "primeng/autocomplete";
import {InputNumberModule} from "primeng/inputnumber";
import {MultiSelectModule} from "primeng/multiselect";
@NgModule({
  declarations: [
    DoctorRegistrationComponent,
    DoctorListComponent,
    DoctorProfileComponent
  ],
  exports: [
    DoctorListComponent,
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
    DividerModule,
    RouterLink,
    DoctorRoutingModule,
    AutoCompleteModule,
    InputNumberModule,
    MultiSelectModule
  ]
})
export class DoctorModule { }
