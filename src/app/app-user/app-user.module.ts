import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppUserRegistrationComponent } from './app-user-registration/app-user-registration.component';

import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {AppUserListComponent} from './app-user-list/app-user-list.component';
import {RouterLink} from "@angular/router";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [
    AppUserRegistrationComponent,
    AppUserListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    RouterLink,
    TableModule,
    DropdownModule,
    MultiSelectModule
  ]
})
export class AppUserModule { }
