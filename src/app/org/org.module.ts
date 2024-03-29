import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import {OrgProfileComponent} from "./org-profile/org-profile.component";
import {OrgRegistrationComponent} from "./org-registration/org-registration.component";

import {CardModule} from 'primeng/card';
import {ChipsModule} from 'primeng/chips';
import {ChipModule} from 'primeng/chip';
import {TagModule} from 'primeng/tag';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import { DividerModule } from 'primeng/divider';
import { OrgListComponent } from './org-list/org-list.component';
import {RouterLink} from "@angular/router";
import {OrgRoutingModule} from "@org/org-routing.module";
import {ToastModule} from "primeng/toast";
import {TabViewModule} from "primeng/tabview";

@NgModule({
  declarations: [
    OrgProfileComponent,
    OrgRegistrationComponent,
    OrgListComponent
  ],
  exports: [
    OrgProfileComponent,
    OrgRegistrationComponent
  ],
    imports: [
        CommonModule,
        CardModule,
        ChipsModule,
        ChipModule,
        TagModule,
        ButtonModule,
        DropdownModule,
        TableModule,
        DynamicDialogModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        DividerModule,
        RouterLink,
        OrgRoutingModule,
        ToastModule,
        TabViewModule
    ]
})
export class OrgModule { }
