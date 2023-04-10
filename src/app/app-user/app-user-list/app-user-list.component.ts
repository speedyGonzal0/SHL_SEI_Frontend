import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {HttpService} from "@shared/services/http.service";
import {AppUserService} from "@shared/services/app-user.service";
import {AppUserRegistrationComponent} from "../app-user-registration/app-user-registration.component";
import {ApiPaths} from "@enums/api-paths";

@Component({
  selector: 'app-app-user-list',
  templateUrl: './app-user-list.component.html',
  styleUrls: ['./app-user-list.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService]

})
export class AppUserListComponent implements OnInit{

  adminURL = ApiPaths.users
  constructor(private messageService: MessageService, private dialogService: DialogService,
              private confirmationService: ConfirmationService, private httpService: HttpService,
              public appUserService: AppUserService) {
  }

  ngOnInit() {
    this.getUserList()
  }

  getUserList(){
    this.httpService.getRequest(`${this.adminURL}/get/all`)
      .subscribe((response: any) => {
        console.log(response.content)
        this.appUserService.appUsers = response.content
      })
  }

  showCreateDialog(){
    this.appUserService.appUserRef = this.dialogService.open(AppUserRegistrationComponent, {
      header: "Register New User",
      width: '50%',
    });
  }

  showEditDialog(index: number){
    this.appUserService.toggleEditMode();
    this.appUserService.appUserRef = this.dialogService.open(AppUserRegistrationComponent, {
      header: `Editing ${this.appUserService.appUsers[index].name}`,
      data: {
        index: index
      },
      width: '50%'
    });

    this.appUserService.appUserRef.onClose.subscribe(() => this.appUserService.toggleEditMode());
  }

  onDelete(index: number) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete user ID: ${this.appUserService.appUsers[index].id}?`,
      acceptButtonStyleClass: "p-button-danger",
      rejectButtonStyleClass: "p-button-outlined p-button-secondary",
      accept: () => {
        this.appUserService.deleteUser(this.appUserService.appUsers[index].id)
      }
    });
  }
}
