import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from "@authentication/login/login.component";
import {DiagnosticListComponent} from "@diagnostics/diagnostic-list/diagnostic-list.component";
import {DoctorProfileComponent} from "@doctor/doctor-profile/doctor-profile.component";
import {DoctorListComponent} from "@doctor/doctor-list/doctor-list.component";
import {OrgProfileComponent} from "./org/org-profile/org-profile.component";

const routes : Routes = [
  {path: "login", component: LoginComponent},
  {path: "diagnostics", component: DiagnosticListComponent},
  {path: "doctor/list", component: DoctorListComponent},
  {path: "doctor/profile/:id", component: DoctorProfileComponent},
  // {path: "org/list", component: OrgListComponent},
  {path: "org/profile/:id", component: OrgProfileComponent},
  // {path: "patient/list", component: PatientListComponent},
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
