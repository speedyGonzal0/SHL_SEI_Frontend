import {Component, OnInit} from '@angular/core';
import {MessageService, ConfirmationService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {DoctorRegistrationComponent} from "../doctor-registration/doctor-registration.component";
import {HttpService} from "@shared/services/http.service";
import {DoctorService} from "@shared/services/doctor.service";
import {ApiPaths} from "@enums/api-paths";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService]
})
export class DoctorListComponent implements OnInit{

  adminUrl = ApiPaths.doctor;
  orgAdminUrl = ApiPaths.orgDoc;

  constructor(private messageService: MessageService,
              private dialogService: DialogService,
              private confirmationService: ConfirmationService,
              private httpService: HttpService,
              public doctorService: DoctorService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe( (qp) => {
      JSON.stringify(qp) === "{}" ? this.getDoctorList() : this.searchDoctors(qp);
    })
    // this.getDoctorList()
  }

  getDoctorList(){
    if(this.doctorService.role === 'admin'){
      this.httpService.getRequest(`${this.adminUrl}/all`)
        .subscribe((response: any) => {
          this.doctorService.doctors = response.content;
          this.doctorService.totalDoctors = response.totalElement;
        })
    }
    else{
      this.httpService.getRequest(`${this.orgAdminUrl}/organization/1/all`)
        .subscribe((response: any) => {
          this.doctorService.doctors = response.content;
          this.doctorService.totalDoctors = response.totalElement;
        })
    }

  }

  searchDoctors(queryParams : Params){
    if(this.doctorService.role === 'admin'){
      this.httpService.getRequestWithParams(`${this.adminUrl}/search`, queryParams).subscribe(
        (response: any) => {
          this.doctorService.doctors = response;
        }
      );
    }
    else{
      this.httpService.getRequestWithParams(`${this.orgAdminUrl}/organization/1/search`, queryParams).subscribe(
        (response: any) => this.doctorService.doctors = response
      );
    }


  }

  showCreateDialog(){
    this.doctorService.doctorRef = this.dialogService.open(DoctorRegistrationComponent, {
      header: "New Doctor",
      style: {'width':'50%', 'max-width': '800px'}
    });
  }

  showEditDialog(index: number){
    this.doctorService.toggleEditMode();
    this.doctorService.doctorRef = this.dialogService.open(DoctorRegistrationComponent, {
      header: `Editing ${this.doctorService.doctors[index].name}`,
      data: {
        index: index
      },
      style: {'width':'50%', 'max-width': '800px'}
    });

    this.doctorService.doctorRef.onClose.subscribe(() => this.doctorService.toggleEditMode());
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
