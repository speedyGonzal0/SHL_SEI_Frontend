import { Component } from '@angular/core';

import {Patient} from "@models/patient";
import {Medicine} from "@models/medicine";
import {FormControl, Validators} from "@angular/forms";
import {ApiPaths} from "@enums/api-paths";
import {HttpService} from "@shared/services/http.service";
import {DialogService} from "primeng/dynamicdialog";
import {PatientRegistrationComponent} from "@patient/patient-registration/patient-registration.component";
import {PatientService} from "@shared/services/patient.service";

@Component({
  selector: 'app-medicine-billing',
  templateUrl: './medicine-billing.component.html',
  styleUrls: ['./medicine-billing.component.scss'],
  providers: [DialogService]
})
export class MedicineBillingComponent {
  filteredPatients!: Patient[];
  filteredMeds!: Medicine[];
  patientSearch!: FormControl;
  medicineSearch!: FormControl;
  patientUrl = ApiPaths.patient;
  medicineUrl = ApiPaths.orgMed;

  selectedMeds!: Medicine[];

  constructor(private httpService: HttpService,
              private patientService: PatientService,
              private dialogService: DialogService,
  ) {
  }

  ngOnInit() {
    this.filteredPatients = [];
    this.selectedMeds = [];
    this.patientSearch = new FormControl(null, Validators.required);
    this.medicineSearch = new FormControl(null, Validators.required);
  }

  filterPatient(e: any){
    let query = e.query;

    this.httpService.getRequestWithParams(`${this.patientUrl}/search`, {query: query}).subscribe(
      (response:any) => this.filteredPatients = response.content
    )
  }

  filterMeds(e: any){
    let query = e.query;

    this.httpService.getRequestWithParams(`${this.medicineUrl}/organization/1/search`, {query: query}).subscribe(
      (response:any) => this.filteredMeds = response.content
    )
  }

  onMedSelect(event:any){
    let med = {quantity: 1, ...event};
    this.selectedMeds.push(med);
    this.medicineSearch.reset();
  }


  onDelete(index:number){
    this.selectedMeds.splice(index, 1);
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


}
