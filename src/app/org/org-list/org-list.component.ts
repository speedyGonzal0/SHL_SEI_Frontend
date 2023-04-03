import { Component } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {HttpService} from "@shared/services/http.service";
import {OrgService} from "@shared/services/org.service";
import {OrgRegistrationComponent} from "@org/org-registration/org-registration.component";

@Component({
  selector: 'app-org-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService]
})
export class OrgListComponent {
  constructor(private messageService: MessageService, private dialogService: DialogService,
              private confirmationService: ConfirmationService, private httpService: HttpService,
              public orgService: OrgService) {
  }

  ngOnInit() {
    this.getOrgList()
  }

  getOrgList(){
    this.httpService.getRequest("http://localhost:9000/organization/admin/1/all")
      .subscribe((response: any) => {
        this.orgService.orgs = response
      })
  }

  showCreateDialog(){
    this.orgService.orgRef = this.dialogService.open(OrgRegistrationComponent, {
      header: "Register New Doctor",
      width: '50%',
    });
  }

  showEditDialog(index: number){
    this.orgService.toggleEditMode();
    this.orgService.orgRef = this.dialogService.open(OrgRegistrationComponent, {
      header: `Editing Dr. ${this.orgService.orgs[index].name}`,
      data: {
        index: index
      },
      width: '50%'
    });

    this.orgService.orgRef.onClose.subscribe(() => this.orgService.toggleEditMode());
  }

  onDelete(index: number) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete org ID: ${this.orgService.orgs[index].id}?`,
      acceptButtonStyleClass: "p-button-danger",
      rejectButtonStyleClass: "p-button-outlined p-button-secondary",
      accept: () => {
        this.orgService.deleteOrg(this.orgService.orgs[index].id);
      }
    });
  }
}
