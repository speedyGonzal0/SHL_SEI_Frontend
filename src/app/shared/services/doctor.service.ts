import { Injectable } from '@angular/core';
import {HttpService} from "@shared/services/http.service";
import {DynamicDialogRef} from "primeng/dynamicdialog";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  doctorRef! : DynamicDialogRef
  editMode : boolean = false;

  doctors : {
    id: number,
    name: string,
    email: string,
    phone: string,
    gender: string,
    specialities: string[],
    degrees: string[]
  }[] = [];

  genders = [
    {gender: "Male", value: 0},
    {gender: "Female", value: 1},
    {gender: "Other", value: 2}];

  constructor(private httpService: HttpService) {}

  toggleEditMode(){
    this.editMode = !this.editMode;
  }

  createDoctor(doctorInfo: any){
    console.log(doctorInfo)
    this.httpService.createRequest(
      "http://localhost:9000/doctor/admin/1/add",{
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
    this.doctorRef.close()
  }

  editDoctor(id:number, doctorInfo: any){
    doctorInfo.gender = doctorInfo.gender.value
    this.httpService.updateRequest(`http://localhost:9000/doctor/update/${id}`,doctorInfo)
      .subscribe(Response => {
        console.log(Response);
      })
    this.doctorRef.close()
  }

  getDoctorByID(id: number){
    this.httpService.getRequest(`http://localhost:9000/doctor/${id}`)
      .subscribe((response: any) => {
        this.doctors = response
        console.log(this.doctors)
      })
  }
}
