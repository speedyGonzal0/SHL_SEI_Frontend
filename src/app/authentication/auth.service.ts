import { Injectable } from '@angular/core';
import {HttpService} from "@shared/services/http.service";
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  isAdmin = false;

  patientID = 1;
  orgID = 1;
  appUserID = 1;
  adminID = 1;

  // role  = 'ROLE_ADMIN'
  // routeData = 'ROLE_ADMIN'

  role  = 'ROLE_ORG_ADMIN'
  routeData = 'ROLE_ORG_ADMIN'

  // role  = 'ROLE_PHARMACIST'
  // routeData = 'ROLE_PHARMACIST'

  // role  = 'ROLE_DIAGNOSTIC_RECEPTIONIST'
  // routeData = 'ROLE_DIAGNOSTIC_RECEPTIONIST'

  // role  = 'ROLE_DOCTOR_RECEPTIONIST'
  // routeData = 'ROLE_DOCTOR_RECEPTIONIST'


  constructor(private httpService: HttpService,
              private router: Router) {
  }

  isAuthenticated(){
    return localStorage.getItem('userRole');
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
