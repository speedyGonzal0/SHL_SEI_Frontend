import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DoctorListComponent} from "@doctor/doctor-list/doctor-list.component";
import {DoctorProfileComponent} from "@doctor/doctor-profile/doctor-profile.component";
import {CheckoutComponent} from "@doctor/doctor-billing/checkout/checkout.component";
import {DoctorBillingComponent} from "@doctor/doctor-billing/doctor-billing.component";

const routes: Routes = [
  {path: "list", component: DoctorListComponent},
  {path: "billing", component: DoctorBillingComponent},
  {path: "checkout", component: CheckoutComponent},
  {path: ":id", component: DoctorProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
