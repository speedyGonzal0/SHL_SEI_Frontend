import { Injectable } from '@angular/core';
import {HttpService} from "@shared/services/http.service";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {ApiPaths} from "@enums/api-paths";
import {Doctor} from "@models/doctor"
import {Params} from "@angular/router";
import {AuthService} from "@authentication/auth.service";
import {HttpResponse} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  doctorURL = ApiPaths.doctor
  orgDoctorURL = ApiPaths.orgDoc
  doctorRef! : DynamicDialogRef
  editMode : boolean = false;
  doctors! : Doctor[]
  role = this.authService.getRole()
  docHTTPResponse!: HttpResponse<any> | null;
  totalDoctors!: number;
  doctor!: Doctor;

  genders = [
    {gender: "Male", value: 0},
    {gender: "Female", value: 1},
    {gender: "Other", value: 2}];

  doctorTypes = [
    {type: "Medical", value: 0},
    {type: "Dentist", value: 1}
  ]

  constructor(private httpService: HttpService, private authService: AuthService) {}

  toggleEditMode(){
    this.editMode = !this.editMode;
  }

  getDoctor(queryParams: Params){
    if (this.role === 'ROLE_ADMIN'){
      this.httpService.getRequestWithParams(`${this.doctorURL}/search`, queryParams).subscribe(
        (response: any) => {
          this.doctors = response.content;
          this.totalDoctors = response.totalElements;
        }
      )
    }
    else {
      this.httpService.getRequestWithParams(`${this.orgDoctorURL}/org/${this.authService.orgID}/search`, queryParams).subscribe(
        (response: any) => {
          this.doctors = response.content;
          this.totalDoctors = response.totalElements;
        }
      )
    }
  }

  createDoctor(doctorInfo: any){
    if (this.role === 'ROLE_ADMIN'){
     return this.httpService.createRequest(`${this.doctorURL}/admin/${this.authService.adminID}/add`, doctorInfo)
    }

    else{
     return this.httpService.createRequest(
       `${this.orgDoctorURL}/appuser/${this.authService.appUserID}/org/${this.authService.orgID}/doctor/${doctorInfo.doctor.id}/add`,
       doctorInfo
     )

    }
  }

  editDoctor(id:number, doctorInfo: any){
    if(this.role === 'ROLE_ADMIN'){
     return this.httpService.updateRequest(`${this.doctorURL}/update/${id}`, doctorInfo)
    }

    else{
     return  this.httpService.updateRequest(`${this.orgDoctorURL}/update/${id}`, doctorInfo)
    }
  }

  getDoctorByID(id: number){
    if(this.role === 'ROLE_ADMIN'){
      this.httpService.getRequest(`${this.doctorURL}/${id}`)
        .subscribe((response: any) => {
          this.doctor = response
        })
    }
    else{
      this.httpService.getRequest(`${this.orgDoctorURL}/get/${id}`)
        .subscribe((response: any) => {
          this.doctor = response
        })
    }


  }
}
