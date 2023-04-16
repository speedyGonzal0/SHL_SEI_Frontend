import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {DiagnosticsService} from "@diagnostics/diagnostics.service";
import {HttpService} from "@shared/services/http.service";
import {Diagnostic} from "@models/diagnostic";

@Component({
  selector: 'app-create-diagnostic',
  templateUrl: './create-diagnostic.component.html',
  styleUrls: ['./create-diagnostic.component.scss']
})
export class CreateDiagnosticComponent implements OnInit{

  createDiagForm !: FormGroup;
  selectDiagForm!: FormGroup;
  selectedDiag: any;
  filteredDiags !: Diagnostic[];


  constructor(public config: DynamicDialogConfig,
              public diagService: DiagnosticsService,
              private httpService: HttpService) {
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
        this.selectDiagForm.controls['price'].setValue(item.price);
      }
    }
  }

  filterDiag(e : any){
    let query = e.query;

    this.httpService.getRequestWithParams(`${this.diagService.adminUrl}/search`, {query: query}).subscribe(
      (response:any) => this.filteredDiags = response.content
    )
  }

  onSubmit(){
    if(this.diagService.editMode){
      this.diagService.updateValue(this.config.data.index, this.createDiagForm.value)
    }
    else{
      this.diagService.selectedDiags.push(this.createDiagForm.value)
      this.diagService.appendValue();
    }
    this.createDiagForm.reset();
  }

  onOrgAdminSubmit(){
    if(!this.diagService.editMode){
      this.diagService.selectedDiags.push(
        {
          organizationId: 1,
          diagnosticId: this.selectDiagForm.value.diag.id,
          price: this.selectDiagForm.value.price,
          serviceName: this.selectDiagForm.value.diag.serviceName
        }
      )
    }
    else{
      this.diagService.updateValue(this.config.data.index, this.selectDiagForm.value);
    }

    this.selectDiagForm.reset();
  }

  onDelete(index: number){
    this.diagService.selectedDiags.splice(index, 1);
  }

  onConfirm(){
    this.diagService.appendValue();
    this.diagService.selectedDiags = [];
  }
}
