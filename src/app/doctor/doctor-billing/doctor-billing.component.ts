import { Component } from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {Patient} from "@models/patient";
import {FormControl, Validators} from "@angular/forms";
import {ApiPaths} from "@enums/api-paths";
import {HttpService} from "@shared/services/http.service";
import {PatientRegistrationComponent} from "@patient/patient-registration/patient-registration.component";
import {PatientService} from "@shared/services/patient.service";

@Component({
  selector: 'app-doctor-billing',
  templateUrl: './doctor-billing.component.html',
  styleUrls: ['./doctor-billing.component.scss'],
  providers: [DialogService]
})
export class DoctorBillingComponent {

  filteredPatients!: Patient[];
  filteredDocs!: any;
  patientSearch!: FormControl;
  docSearch!: FormControl;
  docTime!: FormControl;
  patientUrl = ApiPaths.patient;
  doctorUrl = ApiPaths.doctor;
  minDate!: Date;

  constructor(private httpService: HttpService,
              private patientService: PatientService,
              private dialogService: DialogService,
  ) {
  }

  ngOnInit() {
    this.filteredPatients = [];
    this.minDate = new Date();
    this.patientSearch = new FormControl(null, Validators.required);
    this.docSearch = new FormControl(null, Validators.required);
    this.docTime = new FormControl(null, Validators.required);
  }

  filterPatient(e: any){
    let query = e.query;

    this.httpService.getRequestWithParams(`${this.patientUrl}/search`, {query: query}).subscribe(
      (response:any) => this.filteredPatients = response.content
    )
  }

  filterDocs(e: any){
    let query = e.query;

    this.httpService.getRequestWithParams(`${this.doctorUrl}/search`, {query: query}).subscribe(
      (response:any) => this.filteredDocs = response.content
    )
  }



  showCreateDialog(){
    this.patientService.patientRef = this.dialogService.open(PatientRegistrationComponent, {
      header: "New Patient",
      style: {'width': '50%', 'max-height': '600px'}
    });
  }

  resetPatientSearch(){
    this.patientSearch.reset()
  }

  resetDocSearch(){
    this.docSearch.reset()
  }

}
