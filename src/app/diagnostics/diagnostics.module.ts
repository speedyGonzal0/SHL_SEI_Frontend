import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { DiagnosticListComponent } from '@diagnostics/diagnostic-list/diagnostic-list.component';
import { CreateDiagnosticComponent } from '@diagnostics/create-diagnostic/create-diagnostic.component';
import {SharedModule} from "@shared/shared.module";
import {DiagnosticsRoutingModule} from "@diagnostics/diagnostics-routing.module";
import { DiagnosticBillingComponent } from './diagnostic-billing/diagnostic-billing.component';
import { CheckoutComponent } from './diagnostic-billing/checkout/checkout.component';



@NgModule({
  declarations: [
    DiagnosticListComponent,
    CreateDiagnosticComponent,
    DiagnosticBillingComponent,
    CheckoutComponent
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
    DiagnosticsRoutingModule,
    DiagnosticsRoutingModule,
    FormsModule
  ],
  providers: []
})
export class DiagnosticsModule { }
