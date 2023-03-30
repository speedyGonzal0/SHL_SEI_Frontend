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
import { AutoCompleteModule } from 'primeng/autocomplete';

import { DiagnosticListComponent } from '@diagnostics/diagnostic-list/diagnostic-list.component';
import { CreateDiagnosticComponent } from '@diagnostics/create-diagnostic/create-diagnostic.component';
import {SharedModule} from "@shared/shared.module";
import {DiagnosticsRoutingModule} from "@diagnostics/diagnostics-routing.module";



@NgModule({
  declarations: [
    DiagnosticListComponent,
    CreateDiagnosticComponent
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
    DiagnosticsRoutingModule
  ],
  providers: []
})
export class DiagnosticsModule { }
