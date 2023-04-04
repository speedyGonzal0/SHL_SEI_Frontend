import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {LoginComponent} from "@authentication/login/login.component";

const routes : Routes = [
  {path: "", loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: "login", component: LoginComponent},

]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
