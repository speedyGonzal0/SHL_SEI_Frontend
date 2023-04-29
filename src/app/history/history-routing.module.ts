import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "@authentication/auth.guard";
import {HistoryComponent} from "./history.component";
import {DiagnosticDetailsComponent} from "./diagnostic/diagnostic-details/diagnostic-details.component";
import {MedicineListComponent} from "./medicine/medicine-list/medicine-list.component";
import {MedicineDetailsComponent} from "./medicine/medicine-details/medicine-details.component";
import {DoctorListComponent} from "./doctor/doctor-list/doctor-list.component";
import {DoctorDetailsComponent} from "./doctor/doctor-details/doctor-details.component";
import {DiagnosticListComponent} from "./diagnostic/diagnostic-list/diagnostic-list.component";

const routes: Routes = [
  {path: "", canActivateChild: [AuthGuard], children:[
      {path: "", component: HistoryComponent, data:{
          role:["ROLE_ADMIN", "ROLE_ORG_ADMIN", "ROLE_DIAGNOSTIC_RECEPTIONIST"]
        }},
      {path: "diagnostic", children:[
          {path: "", component: DiagnosticListComponent, data:{
              role:["ROLE_ADMIN", "ROLE_ORG_ADMIN", "ROLE_DIAGNOSTIC_RECEPTIONIST"]
            }},
          {path: ":id", component: DiagnosticDetailsComponent, data:{
              role:["ROLE_ADMIN", "ROLE_ORG_ADMIN", "ROLE_DIAGNOSTIC_RECEPTIONIST"]
            }}
        ]},
      {path: "medicine", children:[
          {path: "", component: MedicineListComponent, data:{
              role:["ROLE_ADMIN", "ROLE_ORG_ADMIN"]
            }},
          {path: ":id", component: MedicineDetailsComponent, data:{
              role:["ROLE_ADMIN", "ROLE_ORG_ADMIN"]
            }}
        ]},
      {path: "doctor-appointment", children:[
          {path: "", component: DoctorListComponent, data:{
              role:["ROLE_ADMIN", "ROLE_ORG_ADMIN"]
            }},
          {path: ":id", component: DoctorDetailsComponent, data:{
              role:["ROLE_ADMIN", "ROLE_ORG_ADMIN"]
            }}
        ]}
    ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
