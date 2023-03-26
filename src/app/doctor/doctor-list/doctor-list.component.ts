import { Component } from '@angular/core';
import {MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {DoctorRegistrationComponent} from "../doctor-registration/doctor-registration.component";

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss'],
  providers: [MessageService, DialogService]
})
export class DoctorListComponent {
  doctors = [
    {
      name: "Renu Akter",
      orgs: ["Square","Labaid"],
      specialities: ["Pediatrics", "Dermatology"],
      gender: "Female",
      degrees: ["PhD", "MBBS"]
    },
    {
      name: "Monjil Akter",
      orgs: ["Apollo","Labaid", "Popular"],
      specialities: ["Dermatology"],
      gender: "Male",
      degrees: ["MBBS"]
    },
    {
      name: "Shawkat Ahmed",
      orgs: ["Square","Labaid"],
      specialities: ["Pediatrics", "Dermatology"],
      gender: "Female",
      degrees: ["PhD", "MBBS"]
    }
  ];

  Object = Object;

  constructor(private messageService: MessageService, private dialogService: DialogService) {
  }

  addSingle() {
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  }

  showCreateDialog(){
    this.dialogService.open(DoctorRegistrationComponent, {
      header: "Register New Doctor",
      width: '50%',
    });
  }
}
