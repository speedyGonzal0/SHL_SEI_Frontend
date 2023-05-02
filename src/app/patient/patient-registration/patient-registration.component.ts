import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "@shared/services/patient.service";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {config} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss'],
  providers: [MessageService]

})
export class PatientRegistrationComponent {
  patientRegForm!: FormGroup;

  constructor(public patientService: PatientService,
              private config: DynamicDialogConfig,
              private messageService: MessageService
              ) {
  }
  ngOnInit() {
    this.patientRegForm = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'phone' : new FormControl(null, [Validators.required, Validators.pattern(/(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/)]),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'gender' : new FormControl(null, [Validators.required]),
      'age' : new FormControl(null, [Validators.required, Validators.min(1)]),
    })

    if(this.config.data) {
      let patient = this.patientService.patients[this.config.data.index];
      this.patientRegForm.setValue({
        name: patient.name,
        phone: patient.phone,
        email: patient.email,
        gender: this.patientService.genders.find(
          (genders) =>
            genders.gender.toLowerCase() === patient.gender?.toLowerCase()
        ),
        age: patient.age
      })
    }
  }

  onCreatePatient(){
    this.patientService.editMode
      ?
    this.updatePatient()
      :
    this.createPatient()

  }

  updatePatient(){
    let patient = this.patientService.patients[this.config.data.index];
    this.patientService.updatePatient({
        ...this.patientRegForm.value,
        gender: this.patientRegForm.value.gender.value,
        id: patient.id
      })
      .subscribe({
        next: response => {
          this.patientService.patientHTTPResponse = response;
          this.patientRegForm.reset()
          this.patientService.patientRef.close()
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
        }
      })
  }

  createPatient(){
    this.patientService.createPatient(
{
        ...this.patientRegForm.value,
        gender: this.patientRegForm.value.gender.value
      }).subscribe({
      next: response => {
        this.patientService.patientHTTPResponse = response;
        this.patientRegForm.reset();
        this.patientService.patientRef.close();
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
      }
    })
  }
}
