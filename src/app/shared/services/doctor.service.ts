import { Injectable } from '@angular/core';
import {HttpService} from "@shared/services/http.service";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {ApiPaths} from "@enums/api-paths";
import {Doctor} from "@models/doctor"
import {Params} from "@angular/router";
import {AuthService} from "@authentication/auth.service";
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
  totalDoctors!: number;
  doctor = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    gender: '',
    bmdc: 0,
    specialities: [],
    degrees: []
  }

  genders = [
    {gender: "Male", value: 0},
    {gender: "Female", value: 1},
    {gender: "Other", value: 2}];

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
          console.log(response);
        }
      )
    }
    else {
      this.httpService.getRequestWithParams(`${this.orgDoctorURL}/organization/1/search`, queryParams).subscribe(
        (response: any) => {
          this.doctors = response.content;
          this.totalDoctors = response.totalElements;
        }
      )
    }
  }

  createDoctor(doctorInfo: any){
    if (this.role === 'ROLE_ADMIN'){
      this.httpService.createRequest(
        `${this.doctorURL}/admin/1/add`,{
          name: doctorInfo.name,
          phone: doctorInfo.phone,
          email: doctorInfo.email,
          gender: doctorInfo.gender.value,
          bmdc: doctorInfo.bmdc,
          specialities: doctorInfo.specialities,
          degrees: doctorInfo.degrees
        })
        .subscribe((response: any) => {
          console.log(response)
        })
    }

    else{
      this.httpService.createRequest(
        `${this.orgDoctorURL}/appuser/1/org/1/doctor/1/add`,{
          ...doctorInfo
        })
        .subscribe((response: any) => {
          console.log(response)
        })

    }
    this.doctorRef.close()
  }

  editDoctor(id:number, doctorInfo: any){
    doctorInfo.gender = doctorInfo.gender.value
    if(this.role === 'ROLE_ADMIN'){
      this.httpService.updateRequest(`${this.doctorURL}/update/${id}`,doctorInfo)
        .subscribe(Response => {
          console.log(Response);
        })
    }
    else{
      this.httpService.updateRequest(`${this.orgDoctorURL}/update/${id}`,doctorInfo)
        .subscribe(Response => {
          console.log(Response);
        })
    }
    this.doctorRef.close()
  }

  getDoctorByID(id: number){
    this.httpService.getRequest(`${this.doctorURL}/${id}`)
      .subscribe((response: any) => {
        this.doctor = response
        console.log(this.doctor)
      })
  }
}
