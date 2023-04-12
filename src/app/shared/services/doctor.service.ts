import { Injectable } from '@angular/core';
import {HttpService} from "@shared/services/http.service";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {ApiPaths} from "@enums/api-paths";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  doctorRef! : DynamicDialogRef
  editMode : boolean = false;

  adminUrl = ApiPaths.doctor;
  orgAdminUrl = ApiPaths.orgDoc;
  role: string = 'admin';

  doctors : {
    id: number,
    name: string,
    email: string,
    phone: string,
    gender: string,
    specialities: string[],
    degrees: string[],
    consultationFee?: number,
    followupFee?: number,
    reportFee?: number,
    availableTimes?: string[]
  }[] = [];

  totalDoctors!: number;

  doctor = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    gender: '',
    specialities: [],
    degrees: []
  }

  genders = [
    {gender: "Male", value: 0},
    {gender: "Female", value: 1},
    {gender: "Other", value: 2}];

  constructor(private httpService: HttpService) {}

  toggleEditMode(){
    this.editMode = !this.editMode;
  }

  createDoctor(doctorInfo: any){
    if (this.role === 'admin'){
      this.httpService.createRequest(
        `${this.adminUrl}/admin/1/add`,{
          name: doctorInfo.name,
          phone: doctorInfo.phone,
          email: doctorInfo.email,
          gender: doctorInfo.gender.value,
          specialities: doctorInfo.specialities,
          degrees: doctorInfo.degrees
        })
        .subscribe((response: any) => {
          console.log(response)
        })
    }

    else{
      this.httpService.createRequest(
        `${this.orgAdminUrl}/appuser/1/org/1/doctor/1/add`,{
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

    if(this.role === 'admin'){
      this.httpService.updateRequest(`${this.adminUrl}/update/${id}`,doctorInfo)
        .subscribe(Response => {
          console.log(Response);
        })
    }
    else{
      this.httpService.updateRequest(`${this.orgAdminUrl}/update/${id}`,doctorInfo)
        .subscribe(Response => {
          console.log(Response);
        })
    }

    this.doctorRef.close()
  }

  getDoctorByID(id: number){
    this.httpService.getRequest(`${this.adminUrl}/${id}`)
      .subscribe((response: any) => {
        this.doctor = response
        // console.log(this.doctor)
      })
  }
}
