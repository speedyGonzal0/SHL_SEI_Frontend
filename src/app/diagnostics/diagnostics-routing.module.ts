import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DiagnosticListComponent} from "@diagnostics/diagnostic-list/diagnostic-list.component";

const routes: Routes = [
  {path: "", component: DiagnosticListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiagnosticsRoutingModule { }
