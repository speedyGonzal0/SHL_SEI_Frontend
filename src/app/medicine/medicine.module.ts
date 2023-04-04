import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CreateMedicineComponent } from './create-medicine/create-medicine.component';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import {MedicineRoutingModule} from "@medicine/medicine-routing.module";



@NgModule({
  declarations: [
    CreateMedicineComponent,
    MedicineListComponent
  ],
  exports: [
    MedicineListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    TableModule,
    ToastModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    MedicineRoutingModule
  ]
})
export class MedicineModule { }
