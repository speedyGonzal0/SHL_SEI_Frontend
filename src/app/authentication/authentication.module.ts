import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {PasswordModule} from 'primeng/password';
import {ConfirmDialogModule} from 'primeng/confirmdialog';


import {LoginComponent} from "./login/login.component";
import { LogoutComponent } from './logout/logout.component';
import {ConfirmationService} from "primeng/api";


@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    PasswordModule,
    FormsModule,
    ConfirmDialogModule
  ],
  providers:[ConfirmationService],
  exports: [
    LoginComponent,
    LogoutComponent
  ]
})
export class AuthenticationModule { }
