import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from "@authentication/login/login.component";
import {DiagnosticListComponent} from "@diagnostics/diagnostic-list/diagnostic-list.component";
import {DoctorProfileComponent} from "@doctor/doctor-profile/doctor-profile.component";
import {DoctorListComponent} from "@doctor/doctor-list/doctor-list.component";
import {OrgProfileComponent} from "@org/org-profile/org-profile.component";
import {OrgListComponent} from "@org/org-list/org-list.component";
import {PatientListComponent} from "@patient/patient-list/patient-list.component";
import {MedicineListComponent} from "@medicine/medicine-list/medicine-list.component";
import {HomeComponent} from "@home/home/home.component";
import {DashboardComponent} from "@home/dashboard/dashboard.component";
import {AppUserListComponent} from "./app-user/app-user-list/app-user-list.component";

const routes : Routes = [
  // {path: "", redirectTo: "/home", pathMatch: "full" },
  {path: "", component: HomeComponent,
    children: [
      {path: "dashboard", component: DashboardComponent},
      {path: "diagnostics", component: DiagnosticListComponent},
      {path: "doctor/list", component: DoctorListComponent},
      {path: "doctor/profile/:id", component: DoctorProfileComponent},
      {path: "org/list", component: OrgListComponent},
      {path: "org/profile/:id", component: OrgProfileComponent},
      {path: "patients", component: PatientListComponent},
      {path: "medicine", component: MedicineListComponent},
      {path: "users", component: AppUserListComponent}
    ]
  },
  {path: "login", component: LoginComponent},

]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
