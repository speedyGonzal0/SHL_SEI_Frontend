import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "@home/home/home.component";
import {DashboardComponent} from "@home/dashboard/dashboard.component";
import {AuthGuard} from "@authentication/auth.guard";

const routes: Routes = [
  {path: "", component: HomeComponent, canActivate: [AuthGuard], canActivateChild:[AuthGuard],
    children: [
      {path: "dashboard", component: DashboardComponent,
        data:{
          role:["ROLE_ADMIN", "ROLE_ORG_ADMIN"]
        }
        },
      {path: "diagnostics",
        data: {
        role: [
          "ROLE_ADMIN",
          "ROLE_ORG_ADMIN",
          "ROLE_DIAGNOSTIC_RECEPTIONIST",
        ]},
        loadChildren: () => import('../diagnostics/diagnostics.module')
          .then(m => m.DiagnosticsModule) },

      {path: "doctor",
        data: {
          role: [
            "ROLE_ADMIN",
            "ROLE_ORG_ADMIN",
            "ROLE_DOCTOR_RECEPTIONIST",
          ]},
        loadChildren: () => import('../doctor/doctor.module')
          .then(m => m.DoctorModule) },

      {path: "org", data: {
          role: [
            "ROLE_ADMIN",
            "ROLE_ORG_ADMIN",
          ]},
        loadChildren: () => import('../org/org.module')
          .then(m => m.OrgModule) },

      {path: "patients", data:{
          role:["ROLE_ADMIN", "ROLE_ORG_ADMIN"]
        },
        loadChildren: () => import('../patient/patient.module')
          .then(m => m.PatientModule) },

      {path: "medicine", data: {
          role: [
            "ROLE_ADMIN",
            "ROLE_ORG_ADMIN",
            "ROLE_PHARMACIST"
          ]},
        loadChildren: () => import('../medicine/medicine.module')
          .then(m => m.MedicineModule) },
      {path: "users", data:{
          role:["ROLE_ADMIN", "ROLE_ORG_ADMIN"]
        },
        loadChildren: () => import('../app-user/app-user.module')
          .then(m => m.AppUserModule) },

      {path: "history", data: {
          role: [
            "ROLE_ADMIN",
            "ROLE_ORG_ADMIN",
            "ROLE_DIAGNOSTIC_RECEPTIONIST"
          ]},
        loadChildren: () => import('../history/history.module')
          .then(m => m.HistoryModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
