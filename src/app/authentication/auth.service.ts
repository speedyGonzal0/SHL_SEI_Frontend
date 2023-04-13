import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAdmin = true;
  role  = 'admin'
  routeData = 'admin'

  isAuthenticated(){
    return localStorage.getItem('isLoggedIn') && (localStorage.getItem('isLoggedIn') === this.routeData)
  }

  login(){
    localStorage.setItem('isLoggedIn', this.role)
  }

  logout(){
    localStorage.clear()
  }
}
