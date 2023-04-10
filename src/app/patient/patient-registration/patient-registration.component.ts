import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "@shared/services/patient.service";

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss']
})
export class PatientRegistrationComponent {
  patientRegForm!: FormGroup;

  constructor(public patientService: PatientService) {
  }
  ngOnInit() {
    this.patientRegForm = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'phone' : new FormControl(null, [Validators.required, Validators.pattern(/(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/)]),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'gender' : new FormControl(null, [Validators.required]),
      'age' : new FormControl(null, [Validators.required, Validators.min(1)]),
    })
  }

  onCreatePatient(){
    this.patientService.createPatient(this.patientRegForm.value)
  }
}
