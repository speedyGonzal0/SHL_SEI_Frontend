import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CreateMedicineComponent } from '@medicine/create-medicine/create-medicine.component';
import { MedicineListComponent } from '@medicine/medicine-list/medicine-list.component';
import {MedicineRoutingModule} from "@medicine/medicine-routing.module";
import {SharedModule} from "@shared/shared.module";
import {AutoCompleteModule} from "primeng/autocomplete";



@NgModule({
  declarations: [
    CreateMedicineComponent,
    MedicineListComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    TableModule,
    ToastModule,
    SharedModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    MedicineRoutingModule
  ]
})
export class MedicineModule { }
