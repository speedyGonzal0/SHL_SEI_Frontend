import { Injectable } from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {HttpService} from "@shared/services/http.service";
import {ApiPaths} from "@enums/api-paths";
import {AppUser} from "@models/appUser";
import {Params} from "@angular/router";
import {AuthService} from "@authentication/auth.service";
import {HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  role = this.authService.getRole()
  userURL = ApiPaths.users
  appUserRef! : DynamicDialogRef
  userHTTPResponse!: HttpResponse<any> | null;

  editMode : boolean = false;
  totalUsers : number = 0;
  appUsers! : AppUser[];

  genders = [
    {gender: "Male", value: 0},
    {gender: "Female", value: 1},
    {gender: "Other", value: 2}];

  roles = [
    {role: "ROLE_DOCTOR_RECEPTIONIST", value: 3},
    {role: "ROLE_DIAGNOSTIC_RECEPTIONIST", value: 4},
    {role: "ROLE_PHARMACIST", value: 5}];

  constructor(private httpService: HttpService, private authService: AuthService) {}

  getAppUser(queryParams: Params){
    if (this.role === 'ROLE_ADMIN'){
      this.httpService.getRequestWithParams(`${this.userURL}/search`, queryParams).subscribe(
        (response: any) => {
          this.appUsers = response.content;
          this.totalUsers = response.totalElements;
        }
      )
    }
    else {
      this.httpService.getRequestWithParams(`${this.userURL}/org/${this.authService.orgID}/search`, queryParams).subscribe(
        (response: any) => {
          this.appUsers = response.content;
          this.totalUsers = response.totalElements;
        }
      )
    }
  }

  toggleEditMode(){
    this.editMode = !this.editMode;
  }

  createUser(appUserInfo: any){
   return this.httpService.createRequest(`${this.userURL}/org/${appUserInfo.orgID}/add`,appUserInfo)
  }

  editUser(id:number, appUserInfo: any){
    console.log(appUserInfo)
    return this.httpService.updateRequest(`${this.userURL}/update/${id}`,appUserInfo)
  }

  deleteUser(id: number){
    this.httpService.deleteRequest(`${this.userURL}/delete/${id}`)
      .subscribe(Response => {
        console.log(Response);
      })
  }
}
