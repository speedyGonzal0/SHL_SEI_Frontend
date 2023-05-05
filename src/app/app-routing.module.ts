import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {LoginComponent} from "@authentication/login/login.component";
import {LandingPageComponent} from "./home/landing-page/landing-page.component";

const routes : Routes = [
  {path: "", loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: "login", component: LoginComponent},
  {path: "landing", component: LandingPageComponent},
  {path: '**', redirectTo: 'login' },
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
