import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import {TableModule} from "primeng/table";
import {RouterLink} from "@angular/router";
import { HistoryDetailsComponent } from './history-details/history-details.component';
import {HistoryRoutingModule} from "./history-routing.module";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [
    HistoryComponent,
    HistoryDetailsComponent
  ],
  exports: [
    HistoryComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    RouterLink,
    HistoryRoutingModule,
    InputTextModule,
    ButtonModule
  ]
})
export class HistoryModule { }
