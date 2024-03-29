import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {HttpService} from "@shared/services/http.service";
import {OrgService} from "@shared/services/org.service";
import {OrgRegistrationComponent} from "@org/org-registration/org-registration.component";
import {RefreshService} from "@shared/services/refresh.service";
import {ApiPaths} from "@enums/api-paths";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-org-diagnostic-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.scss'],
  providers: [ DialogService, ConfirmationService]
})
export class OrgListComponent implements OnInit, OnDestroy{

  orgURL = ApiPaths.org
  orgTableSub!: Subscription;

  constructor( private dialogService: DialogService,
              private confirmationService: ConfirmationService, private httpService: HttpService,
              public orgService: OrgService, private refreshService: RefreshService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.orgTableSub = this.refreshService.orgTable
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
      header: `Edit Organization`,
      data: {
        index: index % 10
      },
      style: { 'min-width': '500px' }
    });

    this.orgService.orgRef.onClose.subscribe(() => {
      this.orgService.toggleEditMode();
    });
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

  ngOnDestroy() {
    this.orgTableSub.unsubscribe();
  }
}
