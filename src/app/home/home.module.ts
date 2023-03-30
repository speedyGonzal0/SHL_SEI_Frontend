import { NgModule } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";


import { CommonModule } from '@angular/common';
import { HomeComponent } from '@home/home/home.component';
import { TopbarComponent } from '@home/topbar/topbar.component';
import { SidebarComponent } from '@home/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthenticationModule} from "@authentication/authentication.module";
import {DoctorModule} from "@doctor/doctor.module";

import {DiagnosticsModule} from "@diagnostics/diagnostics.module";
import {ButtonModule} from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';



@NgModule({
  declarations: [
    HomeComponent,
    TopbarComponent,
    SidebarComponent,
    DashboardComponent
  ],
  exports:[
    HomeComponent,
    TopbarComponent,
    SidebarComponent
  ],
    imports: [
        CommonModule,
        AuthenticationModule,
        ButtonModule,
        SidebarModule,
        RouterLink,
        RouterOutlet,
        RouterLinkActive
    ]
})
export class HomeModule { }
