import { Component } from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {Patient} from "@models/patient";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiPaths} from "@enums/api-paths";
import {HttpService} from "@shared/services/http.service";
import {PatientRegistrationComponent} from "@patient/patient-registration/patient-registration.component";
import {PatientService} from "@shared/services/patient.service";
import {DoctorBillingService} from "@doctor/doctor-billing/doctor-billing.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctor-billing',
  templateUrl: './doctor-billing.component.html',
  styleUrls: ['./doctor-billing.component.scss'],
  providers: [DialogService]
})
export class DoctorBillingComponent {

  DBForm!: FormGroup;
  // patientSearch!: FormControl;
  // docSearch!: FormControl;
  // docTime!: FormControl;
  patientUrl = ApiPaths.patient;
  doctorUrl = ApiPaths.doctor;
  minDate!: Date;

  constructor(private httpService: HttpService,
              private patientService: PatientService,
              private dialogService: DialogService,
              public DBService: DoctorBillingService,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.DBService.filteredPatients = [];
    this.minDate = new Date();
    this.DBService.appointmentOptions = [
      {name: "Consultation", value: 0},
      {name: "Follow-up", value: 1},
      {name: "Report", value: 2}
    ];

    this.DBForm = new FormGroup<any>({
      patientSearch: new FormControl(null, Validators.required),
      docSearch: new FormControl(null, Validators.required),
      docTime: new FormControl(null, Validators.required),
      aptType: new FormControl(null, Validators.required)
    })

    if(this.DBService.selectedPatient){
      this.DBForm.controls['patientSearch'].setValue(this.DBService.selectedPatient);
    }

    if (this.DBService.selectedDoc){
      this.DBForm.controls['docSearch'].setValue(this.DBService.selectedDoc);
    }

    if(this.DBService.selectedTime){
      this.DBForm.controls['docTime'].setValue(this.DBService.selectedTime);
    }

    if(this.DBService.selectedAppointment){
      this.DBForm.controls['aptType'].setValue(this.DBService.selectedAppointment);
    }

    // this.patientSearch = new FormControl(null, Validators.required);
    // this.docSearch = new FormControl(null, Validators.required);
    // this.docTime = new FormControl(null, Validators.required);
  }

  filterPatient(e: any){
    let query = e.query;

    this.httpService.getRequestWithParams(`${this.patientUrl}/search`, {query: query}).subscribe(
      (response:any) => this.DBService.filteredPatients = response.content
    )
  }

  filterDocs(e: any){
    let query = e.query;

    this.httpService.getRequestWithParams(`${this.doctorUrl}/search`, {query: query}).subscribe(
      (response:any) => this.DBService.filteredDocs = response.content
    )
  }



  showCreateDialog(){
    this.patientService.patientRef = this.dialogService.open(PatientRegistrationComponent, {
      header: "New Patient",
      style: {'width': '50%', 'max-height': '600px'}
    });
  }

  resetPatientSearch(){
    this.DBForm.controls['patientSearch'].reset();
  }

  resetDocSearch(){
    this.DBForm.controls['docSearch'].reset();
  }

  onPatientSelect(){
    this.DBService.selectedPatient = this.DBForm.controls['patientSearch'].value;
  }

  onAptSelect(event: any){
    // console.log(event)
    this.DBService.selectedAppointment = event.value.value;
    // console.log(this.DBService.selectedAppointment)
  }

  onDocSelect(){
    this.DBService.selectedDoc = this.DBForm.controls['docSearch'].value;
  }

  onSubmit(){
    this.router.navigate(['/doctor/checkout']);
  }

}
