import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';

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
@NgModule({
  declarations: [
    DoctorRegistrationComponent,
    DoctorListComponent,
    DoctorProfileComponent
  ],
  exports: [
    DoctorRegistrationComponent,
    DoctorListComponent,
    DoctorProfileComponent
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
export class DoctorModule { }
