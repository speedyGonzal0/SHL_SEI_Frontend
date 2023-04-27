import { Injectable } from '@angular/core';
import {HttpService} from "@shared/services/http.service";
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiPaths} from "@enums/api-paths";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  orgID = 1;
  appUserID! : number;
  adminID = 1;
  role = this.getRole()

  constructor(private httpService: HttpService,
              private router: Router) {
  }

  isAuthenticated(){
    return localStorage.getItem('userRole');
  }

  getRole(){
    return localStorage.getItem('userRole')
  }

  login(email: string){
    this.httpService.getRequest(`${ApiPaths.users}/get/email/${email}`).subscribe(
      (response: any) => {
        localStorage.setItem('orgID', JSON.stringify(response.organization.id))
        localStorage.setItem('appUserID', JSON.stringify(response.id))
      }
    )
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['login'])
  }
}
