import { Component } from '@angular/core';
import {MessageService, ConfirmationService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {DoctorRegistrationComponent} from "../doctor-registration/doctor-registration.component";

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService]
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

  constructor(private messageService: MessageService, private dialogService: DialogService, private confirmationService: ConfirmationService) {
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

  showEditDialog(index: number){
    // this.diagService.toggleEditMode();
    // this.diagService.ref = this.dialogService.open(CreateDiagnosticComponent, {
    //   header: `Edit Diagnostic: ${this.diagService.diagnostics[index].id}`,
    //   data: {
    //     index: index
    //   },
    //   width: '50%'
    // });
    //
    // this.diagService.ref.onClose.subscribe(() => this.diagService.toggleEditMode());
  }

  onDelete(index: number) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ${index}?`,
      acceptButtonStyleClass: "p-button-danger",
      rejectButtonStyleClass: "p-button-outlined p-button-secondary",
      accept: () => {
        // this.diagService.deleteValue(index);
      }
    });
  }
}
