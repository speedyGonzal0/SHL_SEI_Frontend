import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppUserListComponent} from "@appuser/app-user-list/app-user-list.component";

const routes: Routes = [
  {path: "", component: AppUserListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppUserRoutingModule { }
