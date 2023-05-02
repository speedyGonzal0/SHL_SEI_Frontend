import {Component, OnInit} from '@angular/core';
import {MessageService, ConfirmationService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {DoctorRegistrationComponent} from "../doctor-registration/doctor-registration.component";
import {HttpService} from "@shared/services/http.service";
import {DoctorService} from "@shared/services/doctor.service";
import {RefreshService} from "@shared/services/refresh.service";
import {ApiPaths} from "@enums/api-paths";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-doctor-diagnostic-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService]
})
export class DoctorListComponent implements OnInit{

  doctorURL = ApiPaths.doctor;
  orgAdminUrl = ApiPaths.orgDoc;

  constructor(private messageService: MessageService,
              private dialogService: DialogService,
              private confirmationService: ConfirmationService,
              private httpService: HttpService,
              public doctorService: DoctorService,
              private route: ActivatedRoute,
              private router: Router,
              private refreshService: RefreshService) {
  }

  ngOnInit() {
    this.refreshService.refreshNeeded$
      .subscribe(() => {
        this.getDoctorList()
        }
      )
    this.getDoctorList()
  }

  getDoctorList(){
    // this.httpService.getRequest(`${this.doctorURL}/all`)
    //   .subscribe((response: any) => {
    //     this.doctorService.doctors = response.content
    //   })
    this.route.queryParams.subscribe(
      (param:Params) => {
        this.doctorService.getDoctor(param);
      }
    )
  }

  showCreateDialog(){
    this.doctorService.doctorRef = this.dialogService.open(DoctorRegistrationComponent, {
      header: "New Doctor",
      style: {'min-width':'600px', 'max-width': '800px'}
    });

    this.doctorService.doctorRef.onClose.subscribe(() => {
      if(this.doctorService.docHTTPResponse){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Doctor Created!' });
        this.doctorService.docHTTPResponse = null;
      }
    });
  }

  showEditDialog(index: number){
    this.doctorService.toggleEditMode();
    this.doctorService.doctorRef = this.dialogService.open(DoctorRegistrationComponent, {
      header: this.doctorService.role === "ROLE_ADMIN" ?
        `Editing ${this.doctorService.doctors[index].name}`
        :
        `Editing ${this.doctorService.doctors[index].doctor.name}`
      ,
      data: {
        index: index
      },
      style: {'width':'600px', 'max-width': '800px'}
    });

    this.doctorService.doctorRef.onClose.subscribe(() => {
      this.doctorService.toggleEditMode();
      if(this.doctorService.docHTTPResponse){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Edit Successful' });
        this.doctorService.docHTTPResponse = null;
      }
    });
  }

  onDelete(index: number) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete doctor: ${this.doctorService.doctors[index].name}?`,
      acceptButtonStyleClass: "p-button-danger",
      rejectButtonStyleClass: "p-button-outlined p-button-secondary",
      accept: () => {
        // this.diagService.deleteValue(index);
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
