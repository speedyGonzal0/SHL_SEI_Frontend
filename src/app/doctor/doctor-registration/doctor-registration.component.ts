import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DoctorService} from "@shared/services/doctor.service";
import {Doctor} from "@models/doctor";
import {HttpService} from "@shared/services/http.service";
import {ApiPaths} from "@enums/api-paths";
@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.scss']
})
export class DoctorRegistrationComponent implements OnInit{

  constructor(public doctorService: DoctorService,
              private config: DynamicDialogConfig,
              private httpService: HttpService
              ) {}

  doctorForm!: FormGroup;
  doctorSelectForm!: FormGroup;
  filteredDocs!: Doctor[];
  availableTimes!: any;
  doctorEditID! : number;
  submitLabel = this.doctorService.editMode ? "Edit" : "Create";

  ngOnInit() {
    this.doctorForm = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'phone' : new FormControl(null, [Validators.required]),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'bmdc' : new FormControl(null, [Validators.required]),
      'gender' : new FormControl(null, [Validators.required]),
      'degrees' : new FormControl(null),
      'specialities' : new FormControl(null),
    })

    this.doctorSelectForm = new FormGroup({
      'doctor': new FormControl(null, Validators.required),
      'consultationFee': new FormControl(null, Validators.required),
      'followupFee': new FormControl(null, Validators.required),
      'reportFee': new FormControl(null, Validators.required),
      'availableTimes': new FormControl(null, Validators.required)
    })

    this.filteredDocs = [];
    this.availableTimes = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    if(this.config.data) {
      let doctor = this.doctorService.doctors[this.config.data.index];
      if (this.doctorService.role === 'ROLE_ADMIN'){
        this.doctorForm.setValue({
          name: doctor.name,
          phone: doctor.phone,
          email: doctor.email,
          gender: this.doctorService.genders.find(
            (genders) =>
              genders.gender.toLowerCase() === doctor.gender?.toLowerCase()
          ),
          bmdc: doctor.bmdc,
          degrees: doctor.degrees,
          specialities: doctor.specialities
        })
      }
      else{
        this.doctorSelectForm.setValue({
          doctor: doctor,
          consultationFee: doctor.consultationFee,
          followupFee: doctor.followupFee,
          reportFee: doctor.reportFee,
          availableTimes: doctor.availableTimes
        })
      }
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

  filterDocs(e : any){
    let query = e.query;

    this.httpService.getRequestWithParams(`${this.doctorService.doctorURL}/search`, {query: query}).subscribe(
      (response:any) => this.filteredDocs = response
    )
  }

  onOrgAdminSubmit(){
    if (this.doctorService.editMode){
      this.doctorService.editDoctor(this.doctorEditID, this.doctorSelectForm.value)
    }
    else{
      // console.log(this.doctorSelectForm.value)
      this.doctorService.createDoctor(this.doctorSelectForm.value)
    }
  }
}
