import {Component, OnInit} from '@angular/core';
import {MessageService, ConfirmationService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {DoctorRegistrationComponent} from "../doctor-registration/doctor-registration.component";
import {HttpService} from "@shared/services/http.service";
import {DoctorService} from "@shared/services/doctor.service";

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService]
})
export class DoctorListComponent implements OnInit{

  constructor(private messageService: MessageService, private dialogService: DialogService,
              private confirmationService: ConfirmationService, private httpService: HttpService,
              public doctorService: DoctorService) {
  }

  ngOnInit() {
    this.getDoctorList()
  }

  getDoctorList(){
    this.httpService.getRequest("http://localhost:9000/doctor/all")
      .subscribe((response: any) => {
        this.doctorService.doctors = response
      })
  }

  showCreateDialog(){
    this.doctorService.doctorRef = this.dialogService.open(DoctorRegistrationComponent, {
      header: "Register New Doctor",
      width: '50%',
    });
  }

  showEditDialog(index: number){
    this.doctorService.toggleEditMode();
    this.doctorService.doctorRef = this.dialogService.open(DoctorRegistrationComponent, {
      header: `Editing ${this.doctorService.doctors[index].name}`,
      data: {
        index: index
      },
      width: '50%'
    });

    this.doctorService.doctorRef.onClose.subscribe(() => this.doctorService.toggleEditMode());
  }

  onDelete(index: number) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete doctor ID: ${this.doctorService.doctors[index].id}?`,
      acceptButtonStyleClass: "p-button-danger",
      rejectButtonStyleClass: "p-button-outlined p-button-secondary",
      accept: () => {
        // this.diagService.deleteValue(index);
      }
    });
  }
}
