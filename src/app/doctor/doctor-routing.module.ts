import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DoctorListComponent} from "@doctor/doctor-list/doctor-list.component";
import {DoctorProfileComponent} from "@doctor/doctor-profile/doctor-profile.component";

const routes: Routes = [
  {path: "list", component: DoctorListComponent},
  {path: ":id", component: DoctorProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
