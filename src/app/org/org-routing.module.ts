import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrgListComponent} from "@org/org-list/org-list.component";
import {OrgProfileComponent} from "@org/org-profile/org-profile.component";

const routes: Routes = [
  {path: "list", component: OrgListComponent},
  {path: ":id", component: OrgProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgRoutingModule { }
