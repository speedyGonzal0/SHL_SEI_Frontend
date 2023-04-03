import { Injectable } from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {HttpService} from "@shared/services/http.service";

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  appUserRef! : DynamicDialogRef
  editMode : boolean = false;

  appUsers : {
    id: number,
    name: string,
    email: string,
    phone: string,
    gender: string,
    address: string,
    age: number,
    role: string,
    password: string,
  }[] = [];

  appUser = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    gender: '',
    address: '',
    age: 0,
    role: '',
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
      "http://localhost:9000/appUser/add",{
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
    this.httpService.updateRequest(`http://localhost:9000/appUser/update/${id}`,appUserInfo)
      .subscribe(Response => {
        console.log(Response);
      })
    this.appUserRef.close()
  }

  deleteUser(id: number){
    this.httpService.deleteRequest(`http://localhost:9000/appUser/delete/${id}`)
      .subscribe(Response => {
        console.log(Response);
      })
  }
}
