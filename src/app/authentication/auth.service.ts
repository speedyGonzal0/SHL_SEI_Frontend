import { Injectable } from '@angular/core';
import {HttpService} from "@shared/services/http.service";
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  isAdmin = true;

  // role  = 'ROLE_ADMIN'
  // routeData = 'ROLE_ADMIN'
  // role  = 'ROLE_ORG_ADMIN'
  // routeData = 'ROLE_ORG_ADMIN'
  role  = 'ROLE_PHARMACIST'
  routeData = 'ROLE_PHARMACIST'


  constructor(private httpService: HttpService,
              private router: Router) {
  }

  isAuthenticated(){
    console.log(localStorage.getItem('userRole'))
    return this.getRole() && (this.getRole() === this.routeData);
  }

  getRole(){
    return localStorage.getItem('userRole')
  }

  login(value: any){

  }

  logout(){
    localStorage.clear()
    this.router.navigate(['login'])
  }
}
