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
import {MessageService} from 'primeng/api';
import {ErrorComponent} from "@shared/../error/error.component";
import { NotificationComponent } from './components/notification/notification.component';



@NgModule({
  declarations: [

    NotificationComponent
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
    ToastModule
  ],
  providers: [MessageService],
  exports: [
    NotificationComponent
  ]
})
export class SharedModule { }
