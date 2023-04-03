import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DoctorService} from "@shared/services/doctor.service";
@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.scss']
})
export class DoctorRegistrationComponent implements OnInit{

  constructor(public doctorService: DoctorService, private config: DynamicDialogConfig) {}

  doctorForm!: FormGroup;

  doctorEditID! : number;
  submitLabel = this.doctorService.editMode ? "Edit" : "Create";

  ngOnInit() {
    this.doctorForm = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'phone' : new FormControl(null, [Validators.required]),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'gender' : new FormControl(null, [Validators.required]),
      'degrees' : new FormControl(null),
      'specialities' : new FormControl(null),
    })

    if(this.config.data) {
      let doctor = this.doctorService.doctors[this.config.data.index];
      this.doctorForm.setValue({
        name: doctor.name,
        phone: doctor.phone,
        email: doctor.email,
        gender: this.doctorService.genders.find(
          (genders) =>
          genders.gender.toLowerCase() === doctor.gender.toLowerCase()
        ),
        degrees: doctor.degrees,
        specialities: doctor.specialities
      })
      this.doctorEditID = doctor.id
    }
  }

  onSubmit(){
    this.doctorService.editMode
      ?
      this.doctorService.editDoctor(this.doctorEditID, this.doctorForm.value)
      :
      this.doctorService.createDoctor(this.doctorForm.value)

    this.doctorForm.reset()
  }
}
