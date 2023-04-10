import { Injectable } from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {HttpService} from "@shared/services/http.service";
import {ApiPaths} from "@enums/api-paths";
import {AppUser} from "@models/appUser";

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  userURL = ApiPaths.users
  appUserRef! : DynamicDialogRef
  editMode : boolean = false;

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
    {role: "Pharmacist", value: 5}];

  constructor(private httpService: HttpService) {}

  toggleEditMode(){
    this.editMode = !this.editMode;
  }

  createUser(appUserInfo: any){

    const roles = appUserInfo.role.map((role: { value: any; }) => {
      return role.value;
    });

    console.log(roles)
    this.httpService.createRequest(
      `${this.userURL}/add`,{
        name: appUserInfo.name,
        phone: appUserInfo.phone,
        email: appUserInfo.email,
        gender: appUserInfo.gender.value,
        address: appUserInfo.address,
        age: appUserInfo.age,
        role: appUserInfo.role,
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
