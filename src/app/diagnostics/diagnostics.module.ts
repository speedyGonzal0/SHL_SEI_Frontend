import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {PasswordModule} from 'primeng/password';
import {InputNumberModule} from 'primeng/inputnumber';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { DiagnosticListComponent } from './diagnostic-list/diagnostic-list.component';
import { DiagnosticDetailsComponent } from './diagnostic-details/diagnostic-details.component';
import { CreateDiagnosticComponent } from './create-diagnostic/create-diagnostic.component';
import {SharedModule} from "@shared/shared.module";



@NgModule({
  declarations: [
    DiagnosticListComponent,
    DiagnosticDetailsComponent,
    CreateDiagnosticComponent
  ],
  exports: [
    DiagnosticListComponent,
    CreateDiagnosticComponent,
    DiagnosticDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    TableModule,
    ToastModule,
    SharedModule,
    DynamicDialogModule,
    ConfirmDialogModule
  ],
  providers: []
})
export class DiagnosticsModule { }
