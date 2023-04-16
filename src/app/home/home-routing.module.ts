import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "@home/home/home.component";
import {DashboardComponent} from "@home/dashboard/dashboard.component";
import {AuthGuard} from "@authentication/auth.guard";

const routes: Routes = [
  {path: "", component: HomeComponent, canActivateChild:[AuthGuard],
    children: [
      {path: "", redirectTo:"dashboard", pathMatch:"full"},
      {path: "dashboard", component: DashboardComponent},
      {path: "diagnostics",
        loadChildren: () => import('../diagnostics/diagnostics.module')
          .then(m => m.DiagnosticsModule) },
      {path: "doctor",
        loadChildren: () => import('../doctor/doctor.module')
          .then(m => m.DoctorModule) },
      {path: "org",
        loadChildren: () => import('../org/org.module')
          .then(m => m.OrgModule) },
      {path: "patients",
        loadChildren: () => import('../patient/patient.module')
          .then(m => m.PatientModule) },
      {path: "medicine",
        loadChildren: () => import('../medicine/medicine.module')
          .then(m => m.MedicineModule) },
      {path: "users",
        loadChildren: () => import('../app-user/app-user.module')
          .then(m => m.AppUserModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
