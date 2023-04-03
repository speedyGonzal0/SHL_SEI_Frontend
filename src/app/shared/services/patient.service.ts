import { Injectable } from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {HttpService} from "@shared/services/http.service";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patientRef! : DynamicDialogRef

  patients : {
    id: number,
    name: string,
    email: string,
    phone: string,
    gender: string,
    age: string,
  }[] = [];

  genders = [
    {gender: "Male", value: 0},
    {gender: "Female", value: 1},
    {gender: "Other", value: 2}];

  constructor(private httpService: HttpService) {}

  createPatient(patientInfo: any){
    console.log(patientInfo)
    this.httpService.createRequest(
      "http://localhost:9000/patient/add",{
        name: patientInfo.name,
        phone: patientInfo.phone,
        email: patientInfo.email,
        gender: patientInfo.gender.value,
        age: patientInfo.age,
      })
      .subscribe((response: any) => {
        console.log(response)
      })
    this.patientRef.close()
  }
}
