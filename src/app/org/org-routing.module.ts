import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrgListComponent} from "@org/org-list/org-list.component";
import {OrgProfileComponent} from "@org/org-profile/org-profile.component";
import {AuthGuard} from "@authentication/auth.guard";

const routes: Routes = [
  {path: "", canActivateChild: [AuthGuard], children:[
      {path: "", component: OrgListComponent, data:{
          role:["ROLE_ADMIN"]
        }},
      {path: ":id", component: OrgProfileComponent, data:{
          role:["ROLE_ADMIN", "ROLE_ORG_ADMIN"]
        }}
    ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgRoutingModule { }
