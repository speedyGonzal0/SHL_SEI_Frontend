import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DiagnosticListComponent} from "@diagnostics/diagnostic-list/diagnostic-list.component";
import {DiagnosticBillingComponent} from "@diagnostics/diagnostic-billing/diagnostic-billing.component";
import {CheckoutComponent} from "@diagnostics/diagnostic-billing/checkout/checkout.component";

const routes: Routes = [
  {path: "list", component: DiagnosticListComponent},
  {path: "billing", component: DiagnosticBillingComponent},
  {path: "checkout", component: CheckoutComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiagnosticsRoutingModule { }
