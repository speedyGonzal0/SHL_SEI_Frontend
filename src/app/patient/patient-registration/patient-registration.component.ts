import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss']
})
export class PatientRegistrationComponent {
  genders = [{gender: "Male"}, {gender: "Female"}];
  patientRegForm!: FormGroup;
  ngOnInit() {
    this.patientRegForm = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'phone' : new FormControl(null, [Validators.required]),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'address' : new FormControl(null, [Validators.required]),
      'age' : new FormControl(null, [Validators.required]),
    })
  }

  onCreatePatient(){
    console.log(this.patientRegForm)
  }
}
