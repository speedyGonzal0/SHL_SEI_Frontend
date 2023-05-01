import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {DiagnosticsService} from "@diagnostics/diagnostics.service";
import {HttpService} from "@shared/services/http.service";
import {Diagnostic} from "@models/diagnostic";
import {AuthService} from "@authentication/auth.service";
import {MessageService} from "primeng/api";
import {config} from "rxjs";

@Component({
  selector: 'app-create-diagnostic',
  templateUrl: './create-diagnostic.component.html',
  styleUrls: ['./create-diagnostic.component.scss'],
  providers: [MessageService]
})
export class CreateDiagnosticComponent implements OnInit{

  createDiagForm !: FormGroup;
  selectDiagForm!: FormGroup;
  selectedDiag: any;
  filteredDiags !: Diagnostic[];



  constructor(public config: DynamicDialogConfig,
              public diagService: DiagnosticsService,
              private httpService: HttpService,
              private authService: AuthService,
              private messageService: MessageService
              ) {
  }

  ngOnInit() {
    this.createDiagForm = new FormGroup({
      "serviceName": new FormControl(null, Validators.required),
    })

    this.selectDiagForm = new FormGroup({
      "diag": new FormControl(null, Validators.required),
      "price": new FormControl(null, Validators.required)
    })

    this.diagService.selectedDiags = [];

    if(this.config.data){
      let item = this.diagService.diagnostics[this.config.data.index];
      if(this.diagService.role === 'ROLE_ADMIN'){
        this.createDiagForm.controls['serviceName'].setValue(item.serviceName);
      }
      else{
        this.selectDiagForm.controls['diag'].setValue(item);
        this.selectDiagForm.controls['price'].setValue(item.price);
      }
    }
  }

  filterDiag(e : any){
    let query = e.query;

    this.httpService.getRequestWithParams(`${this.diagService.adminUrl}/get/all/${this.authService.orgID}`, {query: query}).subscribe(
      (response:any) => this.filteredDiags = response.content
    )
  }

  onSubmit(){
    if(this.diagService.editMode){
      this.updateDiagnostic()
    }
    else{
      this.createDiagnostic();
    }
  }

  createDiagnostic(){
      this.diagService.appendValue(this.createDiagForm.value).subscribe({
        next: response => {
          this.diagService.diagHTTPResponse = response;
          this.createDiagForm.reset();
          this.diagService.diagRef.close();
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
        }
      });
  }

  updateDiagnostic(){
    let item = this.diagService.diagnostics[this.config.data.index];
    let body = {"id": item.id, ...this.createDiagForm.value};
    this.diagService.updateValue(body).subscribe({
      next: response => {
        this.diagService.diagHTTPResponse = response;
        this.createDiagForm.reset();
        this.diagService.diagRef.close();
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
      }
    });
  }

  orgAdminUpdateDiagnostic(){
    let item = this.diagService.diagnostics[this.config.data.index];
    let body = {"id": item.id, "price": this.selectDiagForm.value.price, "organizationId": item.organizationId};
    this.diagService.updateValue(body).subscribe({
      next: response => {
        this.diagService.diagHTTPResponse = response;
        this.selectDiagForm.reset();
        this.diagService.diagRef.close();
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
      }
    });
  }

  onOrgAdminSubmit(){
    if(!this.diagService.editMode){
      this.diagService.selectedDiags.push(
        {
          organizationId: this.authService.orgID,
          diagnosticId: this.selectDiagForm.value.diag.id,
          price: this.selectDiagForm.value.price,
          serviceName: this.selectDiagForm.value.diag.serviceName
        }
      )
      this.selectDiagForm.reset();
    }

    else{
      this.orgAdminUpdateDiagnostic()
    }
  }

  onDelete(index: number){
    this.diagService.selectedDiags.splice(index, 1);
  }

  onConfirm(){
    this.diagService.appendValue({}).subscribe({
      next: response => {
        this.diagService.diagHTTPResponse = response;
        this.diagService.selectedDiags = [];
        this.diagService.diagRef.close();
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
      }
    });
  }
}
