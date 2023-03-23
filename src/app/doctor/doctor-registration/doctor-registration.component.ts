import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.scss']
})
export class DoctorRegistrationComponent implements OnInit{
  genders = [{gender: "Male"}, {gender: "Female"}];

  doctorRegForm!: FormGroup;

  ngOnInit() {
    this.doctorRegForm = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'phone' : new FormControl(null, [Validators.required]),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'gender' : new FormControl(null, [Validators.required]),
      'degree' : new FormControl(null),
      'specialities' : new FormControl(null),

    })
  }

  onSubmit(){
    console.log(this.doctorRegForm)
  }
}
