import { Component } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {HttpService} from "@shared/services/http.service";
import {PatientService} from "@shared/services/patient.service";
import {PatientRegistrationComponent} from "@patient/patient-registration/patient-registration.component";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService]
})
export class PatientListComponent {
  constructor(private messageService: MessageService, private dialogService: DialogService,
              private confirmationService: ConfirmationService, private httpService: HttpService,
              public patientService: PatientService) {
  }

  ngOnInit() {
    this.getPatientList()
  }

  getPatientList(){
    this.httpService.getRequest("http://localhost:9000/patient/get/all")
      .subscribe((response: any) => {
        this.patientService.patients = response
      })
  }

  showCreateDialog(){
    this.patientService.patientRef = this.dialogService.open(PatientRegistrationComponent, {
      header: "Register New Patient",
      width: '50%',
    });
  }
}
