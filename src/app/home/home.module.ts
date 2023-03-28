import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomeComponent } from '@home/home/home.component';
import { TopbarComponent } from '@home/topbar/topbar.component';
import { SidebarComponent } from '@home/sidebar/sidebar.component';
import {AuthenticationModule} from "@authentication/authentication.module";


import {ButtonModule} from 'primeng/button';
import {RouterLink, RouterOutlet} from "@angular/router";



@NgModule({
  declarations: [
    HomeComponent,
    TopbarComponent,
    SidebarComponent
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
    RouterOutlet
  ]
})
export class HomeModule { }
