import { Injectable } from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {HttpService} from "@shared/services/http.service";
import {Patient} from "@models/patient";
import {ApiPaths} from "@enums/api-paths";
import {Params} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patientURL = ApiPaths.patient
  patientRef! : DynamicDialogRef
  patients! : Patient[];
  totalPatients! : number

  genders = [
    {gender: "Male", value: 0},
    {gender: "Female", value: 1},
    {gender: "Other", value: 2}];

  constructor(private httpService: HttpService) {}

  createPatient(patientInfo: any){
    console.log(patientInfo)
    this.httpService.createRequest(
      `${this.patientURL}/add`,{
        name: patientInfo.name,
        phone: patientInfo.phone,
        email: patientInfo.email,
        gender: patientInfo.gender.value,
        age: patientInfo.age,
      })
      .subscribe((response: any) => {
      })
    this.patientRef.close()
  }

  getPatient(queryParams: Params){
    this.httpService.getRequestWithParams(`${this.patientURL}/search`, queryParams).subscribe(
      (response: any) => {
        this.patients = response.content;
        this.totalPatients = response.totalElements;
      }
    )
  }
}
