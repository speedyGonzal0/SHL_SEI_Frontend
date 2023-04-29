import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {HttpService} from "@shared/services/http.service";
import {AppUserService} from "@shared/services/app-user.service";
import {AppUserRegistrationComponent} from "../app-user-registration/app-user-registration.component";
import {ApiPaths} from "@enums/api-paths";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RefreshService} from "@shared/services/refresh.service";

@Component({
  selector: 'app-app-user-diagnostic-list',
  templateUrl: './app-user-list.component.html',
  styleUrls: ['./app-user-list.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService]

})
export class AppUserListComponent implements OnInit{

  adminURL = ApiPaths.users
  constructor(private messageService: MessageService, private dialogService: DialogService,
              private confirmationService: ConfirmationService, private httpService: HttpService,
              public appUserService: AppUserService, private route: ActivatedRoute,
              private refreshService: RefreshService, private router: Router,) {
  }

  ngOnInit() {
    this.refreshService.refreshNeeded$
      .subscribe(() => {
          this.getUserList()
        }
      )
    this.getUserList()
  }

  getUserList(){
    // this.httpService.getRequest(`${this.adminURL}/get/all`)
    //   .subscribe((response: any) => {
    //     console.log(response.content)
    //     this.appUserService.appUsers = response.content
    //   })
    this.route.queryParams.subscribe(
      (param:Params) => {
        this.appUserService.getAppUser(param);
      }
    )
  }

  showCreateDialog(){
    this.appUserService.appUserRef = this.dialogService.open(AppUserRegistrationComponent, {
      header: "New User",
      width: '40%',
    });
  }

  showEditDialog(index: number){
    this.appUserService.toggleEditMode();
    this.appUserService.appUserRef = this.dialogService.open(AppUserRegistrationComponent, {
      header: `Editing ${this.appUserService.appUsers[index].name}`,
      data: {
        index: index
      },
      width: '40%'
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

  onPagination(firstIndex: number){
    let page = firstIndex / 10;
    if(firstIndex === 0){
      this.router.navigate([]);
    }
    else{
      this.router.navigate([],
        {
          queryParams: {pageNo: parseInt(String(page), 10)},
          queryParamsHandling: "merge"
        })
    }
  }

  onSearch(value: any){
    if(value === ''){
      this.router.navigate([]);
    }
    else{
      this.router.navigate([], {queryParams: {query: value}, queryParamsHandling: 'merge'})
    }
  }
}
