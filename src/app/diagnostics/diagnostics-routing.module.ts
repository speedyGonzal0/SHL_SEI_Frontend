import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DiagnosticListComponent} from "@diagnostics/diagnostic-list/diagnostic-list.component";
import {DiagnosticBillingComponent} from "@diagnostics/diagnostic-billing/diagnostic-billing.component";
import {CheckoutComponent} from "@diagnostics/diagnostic-billing/checkout/checkout.component";
import {AuthGuard} from "@authentication/auth.guard";

const routes: Routes = [
  {path: "", canActivateChild: [AuthGuard],
    children: [
      {path: "", component: DiagnosticListComponent, data:{
          role:["ROLE_ADMIN", "ROLE_ORG_ADMIN"]
        }
      },

      {path: "billing", component: DiagnosticBillingComponent, data:{
          role:["ROLE_DIAGNOSTIC_RECEPTIONIST"]
        }
      },

      {path: "checkout", component: CheckoutComponent, data:{
          role:["ROLE_DIAGNOSTIC_RECEPTIONIST"]
        }
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiagnosticsRoutingModule { }
