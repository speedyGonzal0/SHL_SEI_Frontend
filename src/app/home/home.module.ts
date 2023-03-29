import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomeComponent } from '@home/home/home.component';
import { TopbarComponent } from '@home/topbar/topbar.component';
import { SidebarComponent } from '@home/sidebar/sidebar.component';
import {AuthenticationModule} from "@authentication/authentication.module";


import {ButtonModule} from 'primeng/button';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {DoctorModule} from "@doctor/doctor.module";
import {DiagnosticsModule} from "@diagnostics/diagnostics.module";
import { DashboardComponent } from './dashboard/dashboard.component';



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
        RouterLink,
        RouterOutlet,
        RouterLinkActive
    ]
})
export class HomeModule { }
