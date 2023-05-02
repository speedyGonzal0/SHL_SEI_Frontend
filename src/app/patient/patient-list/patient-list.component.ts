import { Component } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {HttpService} from "@shared/services/http.service";
import {PatientService} from "@shared/services/patient.service";
import {PatientRegistrationComponent} from "@patient/patient-registration/patient-registration.component";
import {RefreshService} from "@shared/services/refresh.service";
import {ApiPaths} from "@enums/api-paths";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-patient-diagnostic-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService]
})
export class PatientListComponent {

  patientURL = ApiPaths.patient;
  constructor(private messageService: MessageService, private dialogService: DialogService,
              private confirmationService: ConfirmationService, private httpService: HttpService,
              public patientService: PatientService, private refreshService: RefreshService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.refreshService.refreshNeeded$
      .subscribe(() => {
          this.getPatientList()
        }
      )
    this.getPatientList()
  }

  getPatientList(){
    // this.httpService.getRequest(`${this.patientURL}/get/all`)
    //   .subscribe((response: any) => {
    //     this.patientService.patients = response
    //   })
    this.route.queryParams.subscribe(
      (param:Params) => {
        this.patientService.getPatient(param);
      }
    )
  }

  showCreateDialog(){
    this.patientService.patientRef = this.dialogService.open(PatientRegistrationComponent, {
      header: "New Patient",
      style: {'width':'50%', 'max-width': '800px'}
    });

    this.patientService.patientRef.onClose.subscribe(() => {
      if(this.patientService.patientHTTPResponse){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Patient Created!' });
        this.patientService.patientHTTPResponse = null;
      }
    });
  }

  showEditDialog(index: number){
    this.patientService.toggleEditMode();
    this.patientService.patientRef = this.dialogService.open(PatientRegistrationComponent, {
      header: `Editing ${this.patientService.patients[index].name}`,
      data: {
        index: index
      },
      style: { 'min-width': '500px' }
    });

    this.patientService.patientRef.onClose.subscribe(() => {
      this.patientService.toggleEditMode();
      if(this.patientService.patientHTTPResponse){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Edit Successful' });
        this.patientService.patientHTTPResponse = null;
      }
    });
  }

  onSearch(value: any){
    if(value === ''){
      this.router.navigate([]);
    }
    else{
      this.router.navigate([], {queryParams: {query: value}, queryParamsHandling: 'merge'})
    }
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
}
