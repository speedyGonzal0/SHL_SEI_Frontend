import { Component } from '@angular/core';

import {FormControl, Validators} from "@angular/forms";
import {ApiPaths} from "@enums/api-paths";
import {HttpService} from "@shared/services/http.service";
import {DialogService} from "primeng/dynamicdialog";
import {PatientRegistrationComponent} from "@patient/patient-registration/patient-registration.component";
import {PatientService} from "@shared/services/patient.service";
import {MedicineBillingService} from "@medicine/medicine-billing/medicine-billing.service";
import {AuthService} from "@authentication/auth.service";

@Component({
  selector: 'app-medicine-billing',
  templateUrl: './medicine-billing.component.html',
  styleUrls: ['./medicine-billing.component.scss'],
  providers: [DialogService]
})
export class MedicineBillingComponent {

  patientSearch!: FormControl;
  medicineSearch!: FormControl;
  patientUrl = ApiPaths.patient;
  medicineUrl = ApiPaths.orgMed;


  constructor(private httpService: HttpService,
              private patientService: PatientService,
              private dialogService: DialogService,
              public MBService: MedicineBillingService,
              private authService: AuthService
  ) {  }

  ngOnInit() {
    if(!this.MBService.selectedMeds){
      this.MBService.selectedMeds = [];
    }
    this.MBService.filteredPatients = [];
    this.patientSearch = new FormControl(null, Validators.required);
    this.medicineSearch = new FormControl(null, Validators.required);

    if(this.MBService.selectedPatient){
      this.patientSearch.setValue(this.MBService.selectedPatient);
    }
  }

  filterPatient(e: any){
    let query = e.query;

    this.httpService.getRequestWithParams(`${this.patientUrl}/search`, {query: query}).subscribe(
      (response:any) => this.MBService.filteredPatients = response.content
    )
  }

  filterMeds(e: any){
    let query = e.query;

    this.httpService.getRequestWithParams(`${this.medicineUrl}/organization/${this.authService.orgID}/search`, {query: query}).subscribe(
      (response:any) => this.MBService.filteredMeds = response.content
    )
  }

  onMedSelect(event:any){
    let med = {quantity: 1, total_price: event.medicine.price, ...event};
    this.MBService.selectedMeds.push(med);
    this.medicineSearch.reset();
  }


  onDelete(index:number){
    this.MBService.selectedMeds.splice(index, 1);
  }

  showCreateDialog(){
    this.patientService.patientRef = this.dialogService.open(PatientRegistrationComponent, {
      header: "New Patient",
      style: {'width': '50%', 'max-height': '600px'}
    });
  }

  handleQtyInput(event: any, medIndex: number){
    let med: any = this.MBService.selectedMeds[medIndex];
    med.total_price = med.quantity * med.medicine.price;
  }

  resetPatientSearch(){
    this.patientSearch.reset()
  }

  onPatientSelect(){
    this.MBService.selectedPatient = this.patientSearch.value;
  }


}
