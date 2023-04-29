import { Component } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {HttpService} from "@shared/services/http.service";
import {OrgService} from "@shared/services/org.service";
import {OrgRegistrationComponent} from "@org/org-registration/org-registration.component";
import {RefreshService} from "@shared/services/refresh.service";
import {ApiPaths} from "@enums/api-paths";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-org-diagnostic-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService]
})
export class OrgListComponent {

  orgURL = ApiPaths.org

  constructor(private messageService: MessageService, private dialogService: DialogService,
              private confirmationService: ConfirmationService, private httpService: HttpService,
              public orgService: OrgService, private refreshService: RefreshService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.refreshService.refreshNeeded$
      .subscribe(() => {
          this.getOrgList()
        }
      )
    this.getOrgList()
  }

  getOrgList(){
    // this.httpService.getRequest(`${this.orgURL}/all`)
    //   .subscribe((response: any) => {
    //     this.orgService.orgs = response.content
    //   })
    this.route.queryParams.subscribe(
      (param:Params) => {
        this.orgService.getOrg(param);
      }
    )
  }

  showCreateDialog(){
    this.orgService.orgRef = this.dialogService.open(OrgRegistrationComponent, {
      header: "New Organization",
      style: { 'min-width': '500px' },
    });
  }

  showEditDialog(index: number){
    this.orgService.toggleEditMode();
    this.orgService.orgRef = this.dialogService.open(OrgRegistrationComponent, {
      header: `Editing ${this.orgService.orgs[index].name}`,
      data: {
        index: index
      },
      style: { 'min-width': '500px' }
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

  onPagination(firstIndex: number){
    let page = firstIndex / 10;
    if(firstIndex === 0){
      this.router.navigate([]);
    }
    else{
      this.router.navigate([],
        {
          queryParams: {page: parseInt(String(page), 10)},
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
