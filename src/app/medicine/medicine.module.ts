import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MedicineBillingComponent } from '@medicine/medicine-billing/medicine-billing.component';
import { CheckoutComponent } from '@medicine/medicine-billing/checkout/checkout.component';

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
import {ChipModule} from "primeng/chip";


import {TagModule} from "primeng/tag";

@NgModule({
  declarations: [
    CreateMedicineComponent,
    MedicineListComponent,
    MedicineBillingComponent,
    CheckoutComponent,
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
    TagModule,
    SharedModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    FormsModule,
    AutoCompleteModule,
    MedicineRoutingModule,
    ChipModule,
    FormsModule
  ]
})
export class MedicineModule { }
