import {Injectable, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  isAdmin = true;
  role  = 'ADMIN'
  routeData = 'ADMIN'

  constructor(private router: Router) {}

  isAuthenticated(){
    console.log(localStorage.getItem('isLoggedIn'))
    return this.getRole() && (this.getRole() === this.routeData);
  }

  getRole(){
    return localStorage.getItem('isLoggedIn')
  }

  login(){
    localStorage.setItem('isLoggedIn', this.role)
    this.router.navigate([''])
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['login'])
  }
}
