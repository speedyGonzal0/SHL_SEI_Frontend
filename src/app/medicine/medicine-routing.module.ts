import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MedicineListComponent} from "@medicine/medicine-list/medicine-list.component";

const routes: Routes = [
  {path: "", component: MedicineListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicineRoutingModule { }
