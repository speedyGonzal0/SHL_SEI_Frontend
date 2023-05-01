import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DoctorService} from "@shared/services/doctor.service";
import {Doctor} from "@models/doctor";
import {HttpService} from "@shared/services/http.service";
import {ApiPaths} from "@enums/api-paths";
import {AuthService} from "@authentication/auth.service";
import {MessageService} from "primeng/api";
@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.scss'],
  providers: [MessageService]
})
export class DoctorRegistrationComponent implements OnInit{

  constructor(public doctorService: DoctorService,
              private config: DynamicDialogConfig,
              private httpService: HttpService,
              private authService: AuthService,
              private messageService: MessageService
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
      'phone' : new FormControl(null, [Validators.required, Validators.pattern(/(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/)]),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'bmdc' : new FormControl(null, [Validators.required]),
      'gender' : new FormControl(null, [Validators.required]),
      'doctorType' : new FormControl(null, [Validators.required]),
      'degrees' : new FormControl(null, [Validators.required]),
      'specialities' : new FormControl(null, [Validators.required]),
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
          doctorType: this.doctorService.doctorTypes.find(
            (types) => types.type.toLowerCase() === doctor.doctorType?.toLowerCase()
          ),
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
      this.editDoctor()
      :
      this.createDoctor()
  }

  editDoctor(){
      this.doctorService.editDoctor(this.doctorEditID, {
        ...this.doctorForm.value,
        gender: this.doctorForm.value.gender.value,
        doctorType: this.doctorForm.value.doctorType.value
      })
        .subscribe({
          next: response => {
            this.doctorService.docHTTPResponse = response;
            this.doctorForm.reset();
            this.doctorService.doctorRef.close();
          },
          error: err => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
          }
        })
  }

  createDoctor(){
    this.doctorService.createDoctor(
{
        ...this.doctorForm.value,
        gender: this.doctorForm.value.gender.value,
        doctorType: this.doctorForm.value.doctorType.value
      })
      .subscribe({
        next: response => {
          this.doctorService.docHTTPResponse = response;
          this.doctorForm.reset();
          this.doctorService.doctorRef.close();
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
        }
      })

  }

  filterDocs(e : any){
    let query = e.query;

    this.httpService.getRequestWithParams(`${this.doctorService.doctorURL}/org/${this.authService.orgID}/search`, {query: query}).subscribe(
      (response:any) => this.filteredDocs = response.content
    )
  }

  onOrgAdminSubmit(){
    this.doctorService.editMode
    ?
    this.orgAdminEditDoctor()
    :
    this.orgAdminCreateDoctor()
  }

  orgAdminCreateDoctor(){
    this.doctorService.createDoctor(this.doctorSelectForm.value)
      .subscribe({
        next: response => {
          this.doctorService.docHTTPResponse = response;
          this.doctorForm.reset();
          this.doctorService.doctorRef.close();
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
        }
      })
  }

  orgAdminEditDoctor(){
    this.doctorService.editDoctor(this.doctorEditID, this.doctorSelectForm.value)

    this.doctorService.editDoctor(this.doctorEditID, this.doctorSelectForm.value)
      .subscribe({
        next: response => {
          this.doctorService.docHTTPResponse = response;
          this.doctorSelectForm.reset();
          this.doctorService.doctorRef.close();
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
        }
      })
  }
}
