import { Injectable } from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {HttpService} from "@shared/services/http.service";
import {Patient} from "@models/patient";
import {ApiPaths} from "@enums/api-paths";
import {Params} from "@angular/router";
import {AuthService} from "@authentication/auth.service";
import {HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patientURL = ApiPaths.patient
  patientRef! : DynamicDialogRef
  patientHTTPResponse!: HttpResponse<any> | null;

  patients! : Patient[];
  totalPatients! : number
  editMode : boolean = false;
  role = this.authService.getRole();

  genders = [
    {gender: "Male", value: 0},
    {gender: "Female", value: 1},
    {gender: "Other", value: 2}];

  constructor(private httpService: HttpService, private authService: AuthService) {}

  createPatient(patientInfo: any){
   return this.httpService.createRequest(`${this.patientURL}/add`, patientInfo)
  }

  updatePatient(patientInfo: any){
    return this.httpService.updateRequest(`${this.patientURL}/update`, patientInfo)
  }

  getPatient(queryParams: Params){
    this.httpService.getRequestWithParams(`${this.patientURL}/search`, queryParams).subscribe(
      (response: any) => {
        this.patients = response.content;
        this.totalPatients = response.totalElements;
      }
    )
  }

  toggleEditMode(){
    this.editMode = !this.editMode;
  }
}
