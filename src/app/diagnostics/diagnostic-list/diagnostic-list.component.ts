import { Component } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogService} from "primeng/dynamicdialog";
import {CreateDiagnosticComponent} from "../create-diagnostic/create-diagnostic.component";
import {DiagnosticsService} from "@diagnostics/diagnostics.service";

@Component({
  selector: 'app-diagnostic-list',
  templateUrl: './diagnostic-list.component.html',
  styleUrls: ['./diagnostic-list.component.scss'],
  providers: [MessageService, DialogService]
})
export class DiagnosticListComponent {

  Object = Object;


  constructor(private messageService: MessageService,
              private dialogService: DialogService,
              private confirmationService: ConfirmationService,
              public diagService: DiagnosticsService) {
  }

  addSingle() {
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  }

  showCreateDialog(){
    this.diagService.ref = this.dialogService.open(CreateDiagnosticComponent, {
      header: "Create New Diagnostic",
      width: '50%'
    });
  }

  showEditDialog(index: number){
    this.diagService.toggleEditMode();
    this.diagService.ref = this.dialogService.open(CreateDiagnosticComponent, {
      header: `Edit Diagnostic: ${this.diagService.orgDiagnostics[index].id}`,
      data: {
        index: index
      },
      width: '50%'
    });

    this.diagService.ref.onClose.subscribe(() => this.diagService.toggleEditMode());
  }

  onDelete(index: number){
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete Diagnostic ${this.diagService.diagnostics[index].id}?`,
      acceptButtonStyleClass: "p-button-danger",
      rejectButtonStyleClass: "p-button-outlined p-button-secondary",
      accept: () => {
        this.diagService.deleteValue(index);
      }
    });

  }

}
