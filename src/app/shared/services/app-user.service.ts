import { Injectable } from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {HttpService} from "@shared/services/http.service";
import {ApiPaths} from "@enums/api-paths";
import {AppUser} from "@models/appUser";
import {Params} from "@angular/router";
import {AuthService} from "@authentication/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  role = this.authService.getRole()
  userURL = ApiPaths.users
  appUserRef! : DynamicDialogRef
  editMode : boolean = false;
  totalUsers : number = 0;
  appUsers! : AppUser[];

  appUser = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    gender: '',
    address: '',
    age: 0,
    role: [],
    password: ''
  }

  genders = [
    {gender: "Male", value: 0},
    {gender: "Female", value: 1},
    {gender: "Other", value: 2}];

  roles = [
    {role: "Doctor Receptionist", value: 3},
    {role: "Diagnostic Receptionist", value: 4},
    {role: "ROLE_PHARMACIST", value: 5}];

  constructor(private httpService: HttpService, private authService: AuthService) {}

  getAppUser(queryParams: Params){
    if (this.role === 'ROLE_ADMIN'){
      this.httpService.getRequestWithParams(`${this.userURL}/search`, queryParams).subscribe(
        (response: any) => {
          this.appUsers = response.content;
          this.totalUsers = response.totalElements;
          console.log(response);
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
    console.log(appUserInfo)

    const roles = appUserInfo.role.map((role: { value: any }) => {
      return role.value;
    });

    console.log("Roles: ",roles)
    this.httpService.createRequest(
      `${this.userURL}/org/${appUserInfo.orgID}/add`,{
        name: appUserInfo.name,
        phone: appUserInfo.phone,
        email: appUserInfo.email,
        gender: appUserInfo.gender.value,
        address: appUserInfo.address,
        age: appUserInfo.age,
        role: this.authService.role === "ROLE_ORG_ADMIN" ? roles : appUserInfo.role,
        password: appUserInfo.password,
      })
      .subscribe((response: any) => {
        console.log(response)
      })
    this.appUserRef.close()
  }

  editUser(id:number, appUserInfo: any){
    appUserInfo.gender = appUserInfo.gender.value
    this.httpService.updateRequest(`${this.userURL}/update/${id}`,appUserInfo)
      .subscribe(Response => {
        console.log(Response);
      })
    this.appUserRef.close()
  }

  deleteUser(id: number){
    this.httpService.deleteRequest(`${this.userURL}/delete/${id}`)
      .subscribe(Response => {
        console.log(Response);
      })
  }
}
