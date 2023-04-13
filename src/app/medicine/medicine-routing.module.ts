import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MedicineListComponent} from "@medicine/medicine-list/medicine-list.component";
import {MedicineBillingComponent} from "@medicine/medicine-billing/medicine-billing.component";
import {CheckoutComponent} from "@medicine/medicine-billing/checkout/checkout.component";

const routes: Routes = [
  {path: "list", component: MedicineListComponent},
  {path: "billing", component: MedicineBillingComponent},
  {path: "checkout", component: CheckoutComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicineRoutingModule { }
