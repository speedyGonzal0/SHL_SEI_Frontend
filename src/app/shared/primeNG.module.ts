import { NgModule } from '@angular/core';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  exports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule
  ]
})
export class PrimeNGModule { }
