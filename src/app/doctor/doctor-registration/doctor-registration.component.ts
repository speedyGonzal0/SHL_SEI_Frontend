import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DoctorService} from "@shared/services/doctor.service";
import {Doctor} from "@models/doctor";
import {HttpService} from "@shared/services/http.service";
import {ApiPaths} from "@enums/api-paths";
import {AuthService} from "@authentication/auth.service";
import {NotificationService} from "@shared/components/notification/notification.service";
import {dayTimes} from "@models/dayTimes";
import {RefreshService} from "@shared/services/refresh.service";
@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.scss'],
  providers: []
})
export class DoctorRegistrationComponent implements OnInit{

  constructor(public doctorService: DoctorService,
              private config: DynamicDialogConfig,
              private httpService: HttpService,
              private authService: AuthService,
              private refreshService: RefreshService,
              private notificationService: NotificationService
              ) {}

  doctorForm!: FormGroup;
  doctorSelectForm!: FormGroup;
  filteredDocs!: Doctor[];
  availableTimes!: any;
  doctorEditID! : number;
  submitLabel = this.doctorService.editMode ? "Update" : "Confirm";

  availableDayTimes!: dayTimes[] | undefined;

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
      'availableTimes': new FormControl(null, Validators.required),
      // 'availableDayTimes': new FormGroup({
      //   'day': new FormControl(null),
      //   'startTime': new FormControl(null),
      //   'endTIme': new FormControl(null)
      // })
    })

    this.filteredDocs = [];
    this.availableDayTimes = [];
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
          availableTimes: doctor.availableDayTimes?.map( dt => dt.day)
        })
        this.availableDayTimes = doctor.availableDayTimes
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
            this.notificationService.sendSuccessMessage("Edit Successful!")
            this.doctorForm.reset();
            this.refreshService.updateDocTable();
            this.doctorService.doctorRef.close();
          },
          error: err => {
            this.notificationService.sendErrorMessage(err.error.message)
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
          this.notificationService.sendSuccessMessage("Created Successfully!");
          this.doctorForm.reset();
          this.refreshService.updateDocTable();
          this.doctorService.doctorRef.close();
        },
        error: err => {
          this.notificationService.sendErrorMessage(err.error.message)
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
    this.doctorService.createDoctor({
      ...this.doctorSelectForm.value,
      availableDayTimes: this.availableDayTimes
    })
      .subscribe({
        next: response => {
          this.notificationService.sendSuccessMessage("Created Successfully");
          this.doctorForm.reset();
          this.refreshService.updateDocTable();
          this.doctorService.doctorRef.close();
        },
        error: err => {
          this.notificationService.sendErrorMessage(`${err.error.message}`);
        }
      })
  }

  orgAdminEditDoctor(){
    // console.log({...this.doctorSelectForm.value, availableDayTimes: this.availableDayTimes})
    // this.doctorService.editDoctor(this.doctorEditID,
    //   {
    //     ...this.doctorSelectForm.value,
    //     availableDayTimes: this.availableDayTimes
    //   })

    this.doctorService.editDoctor(this.doctorEditID, {
      ...this.doctorSelectForm.value,
      availableDayTimes: this.availableDayTimes
    })
      .subscribe({
        next: response => {
          this.notificationService.sendSuccessMessage("Edit Successful!")
          this.doctorSelectForm.reset();
          this.refreshService.updateDocTable();
          this.doctorService.doctorRef.close();
        },
        error: err => {
          this.notificationService.sendErrorMessage(`${err.error.message}` );
        }
      })
  }

  showTime(event: any){
    console.log(event)
  }

  appendDayTime(event: any){
    this.availableDayTimes = []
    event.value.forEach( (t:any) => {
      this.availableDayTimes?.push({day: t, startTime: "", endTime: ""})
    })
    // this.availableDayTime.push({day: event.itemValue, startTime: "", endTime: ""})
  }
}
