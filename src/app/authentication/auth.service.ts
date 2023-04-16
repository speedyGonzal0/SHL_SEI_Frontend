import {Injectable, OnInit} from '@angular/core';
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

  constructor(private router: Router) {}

  isAuthenticated(){
    console.log(localStorage.getItem('userRole'))
    return this.getRole() && (this.getRole() === this.routeData);
  }

  getRole(){
    return localStorage.getItem('userRole')
  }

  login(){
    localStorage.setItem('userRole', this.role)
    this.router.navigate([''])
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['login'])
  }
}
