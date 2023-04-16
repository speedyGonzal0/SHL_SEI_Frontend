import {Component, OnInit} from '@angular/core';
import {Patient} from "@models/patient";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "@shared/services/http.service";
import {ApiPaths} from "@enums/api-paths";
import {Diagnostic} from "@models/diagnostic";
import {DialogService} from "primeng/dynamicdialog";
import {PatientRegistrationComponent} from "@patient/patient-registration/patient-registration.component";
import {PatientService} from "@shared/services/patient.service";
import {DiagnosticBillingService} from "@diagnostics/diagnostic-billing/diagnostic-billing.service";

@Component({
  selector: 'app-diagnostic-billing',
  templateUrl: './diagnostic-billing.component.html',
  styleUrls: ['./diagnostic-billing.component.scss'],
  providers: [DialogService]
})
export class DiagnosticBillingComponent implements OnInit{

  patientSearch!: FormControl;
  diagnosticSearch!: FormControl;
  patientUrl = ApiPaths.patient;
  diagnosticUrl = ApiPaths.orgDiag;

  constructor(private httpService: HttpService,
              private patientService: PatientService,
              public DBService: DiagnosticBillingService,
              private dialogService: DialogService,
              ) {
  }

  ngOnInit() {

    if(!this.DBService.selectedDiagnostics){
      this.DBService.selectedDiagnostics = [];
    }
    this.DBService.filteredDiagnostics = [];
    this.DBService.filteredPatients = [];

    this.patientSearch = new FormControl(null, Validators.required);
    this.diagnosticSearch = new FormControl(null, Validators.required);

    if(this.DBService.selectedPatient){
      this.patientSearch.setValue(this.DBService.selectedPatient);
    }
  }

  filterPatient(e: any){
    let query = e.query;

    this.httpService.getRequestWithParams(`${this.patientUrl}/search`, {query: query}).subscribe(
      (response:any) => this.DBService.filteredPatients = response.content
    )
  }

  filterDiagnostic(e: any){
    let query = e.query;

    this.httpService.getRequestWithParams(`${this.diagnosticUrl}/organization/1/search`, {query: query}).subscribe(
      (response:any) => this.DBService.filteredDiagnostics = response.content
    )
  }


  onDelete(index:number){
    this.DBService.selectedDiagnostics.splice(index, 1);
  }

  showCreateDialog(){
    this.patientService.patientRef = this.dialogService.open(PatientRegistrationComponent, {
      header: "New Patient",
      style: {'width': '50%', 'max-height': '600px'}
    });
  }

  onDiagSelect(event:any){
    this.DBService.selectedDiagnostics.push(
      {
        final_price: event.price,
        discount: 0,
        discountApplied: false,
        ...event
      }
    );
    this.diagnosticSearch.reset();
  }

  onPatientSelect(){
    this.DBService.selectedPatient = this.patientSearch.value;
  }

  resetPatientSearch(){
    this.DBService.selectedPatient = {};
    this.patientSearch.reset()
  }

}
