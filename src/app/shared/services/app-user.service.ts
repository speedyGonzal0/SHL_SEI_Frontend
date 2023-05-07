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
  role !: string;
  userInfo!: AppUser;
  userURL = ApiPaths.users
  appUserRef! : DynamicDialogRef

  editMode : boolean = false;
  totalUsers : number = 0;
  appUsers! : AppUser[];

  genders = [
    "MALE",
    "FEMALE",
    "OTHER"];

  roles = [
    "ROLE_DOCTOR_RECEPTIONIST",
    "ROLE_DIAGNOSTIC_RECEPTIONIST",
    "ROLE_PHARMACIST"];

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
      this.httpService.getRequestWithParams(`${this.userURL}/org/${this.userInfo.organization.id}/search`, queryParams).subscribe(
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
    return this.httpService.updateRequest(`${this.userURL}/update/${id}`,appUserInfo)
  }

  deleteUser(id: number){
    this.httpService.deleteRequest(`${this.userURL}/delete/${id}`)
      .subscribe(Response => {
        console.log(Response);
      })
  }
}
