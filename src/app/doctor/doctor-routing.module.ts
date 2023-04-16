import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DoctorListComponent} from "@doctor/doctor-list/doctor-list.component";
import {DoctorProfileComponent} from "@doctor/doctor-profile/doctor-profile.component";
import {CheckoutComponent} from "@doctor/doctor-billing/checkout/checkout.component";
import {DoctorBillingComponent} from "@doctor/doctor-billing/doctor-billing.component";

const routes: Routes = [
  {path: "list", component: DoctorListComponent, data:{
      role:["ROLE_ADMIN", "ROLE_ORG_ADMIN"]
    }
  },

  {path: "billing", component: DoctorBillingComponent, data:{
      role:["ROLE_DOCTOR_RECEPTIONIST"]
    }
  },
  {path: "checkout", component: CheckoutComponent, data:{
      role:["ROLE_DOCTOR_RECEPTIONIST"]
    }
  },
  {path: ":id", component: DoctorProfileComponent,data:{
      role:["ROLE_ADMIN", "ROLE_ORG_ADMIN"]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
