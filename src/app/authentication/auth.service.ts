import { Injectable } from '@angular/core';
import {HttpService} from "@shared/services/http.service";
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiPaths} from "@enums/api-paths";
import {BehaviorSubject, Observable, Subject, Subscriber} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  orgID! : number;
  orgName! : string;
  appUserID! : number;
  adminID = 1;
  appUserName! : string;
  appUserEmail! : string;
  role !: string;
  newRole!: Observable<any>;

  userInfo: any;

  private userSource = new BehaviorSubject({});

  userSourceInfo = this.userSource.asObservable();

  constructor(private httpService: HttpService,
              private router: Router) {
  }

  isAuthenticated(){
    return localStorage.getItem('userRole');
  }

  getRole(){
    return localStorage.getItem('userRole')!
  }

  fetchUser(){

    return this.httpService.getRequest(`${ApiPaths.users}/get/info`)
  }

  setUser(user : any){
    this.userSource.next(user)
    localStorage.setItem('userRole', user.role);
    this.role = user.role.toString();
    this.orgID = user.organization.id
    this.orgName = user.organization.name
    this.appUserID = user.id
    this.appUserName = user.name
    this.appUserEmail = user.email
  }

  logout(){
    this.userSource.next({})
    localStorage.clear()
    this.router.navigate(['login'])
  }
}
