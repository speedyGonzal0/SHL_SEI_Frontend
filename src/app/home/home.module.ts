import { NgModule } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

import { CommonModule } from '@angular/common';
import { HomeComponent } from '@home/home/home.component';
import { TopbarComponent } from '@home/topbar/topbar.component';
import { SidebarComponent } from '@home/sidebar/sidebar.component';
import { DashboardComponent } from '@home/dashboard/dashboard.component';
import { AdminDashboardComponent } from '@home/dashboard/admin-dashboard/admin-dashboard.component';
import {HomeRoutingModule} from "@home/home-routing.module";
import {AuthenticationModule} from "@authentication/authentication.module";

import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {CardModule} from "primeng/card";
import { OrgAdminDashboardComponent } from './dashboard/org-admin-dashboard/org-admin-dashboard.component';

@NgModule({
  declarations: [
    HomeComponent,
    TopbarComponent,
    SidebarComponent,
    DashboardComponent,
    AdminDashboardComponent,
    OrgAdminDashboardComponent
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
        RouterLinkActive,
        CardModule,
        HomeRoutingModule
    ],
})
export class HomeModule { }
