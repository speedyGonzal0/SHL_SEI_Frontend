import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "@authentication/auth.guard";
import {HistoryComponent} from "./history.component";
import {HistoryDetailsComponent} from "./history-details/history-details.component";

const routes: Routes = [
  {path: "", canActivateChild: [AuthGuard], children:[
      {path: "", component: HistoryComponent, data:{
          role:["ROLE_ADMIN", "ROLE_ORG_ADMIN"]
        }},
      {path: ":id", component: HistoryDetailsComponent, data:{
          role:["ROLE_ADMIN", "ROLE_ORG_ADMIN"]
        }}
    ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
