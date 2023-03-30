import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {DiagnosticsService} from "@diagnostics/diagnostics.service";
import {HttpService} from "@shared/services/http.service";

@Component({
  selector: 'app-create-diagnostic',
  templateUrl: './create-diagnostic.component.html',
  styleUrls: ['./create-diagnostic.component.scss']
})
export class CreateDiagnosticComponent implements OnInit{

  createDiagForm !: FormGroup;
  selectedDiag: any;
  filteredDiags: {id: number, serviceName: string}[] = [];

  products = [{name: "adsa", code: "asd", quantity: "asdaw", category: "asdwd"}]


  constructor(public config: DynamicDialogConfig,
              public diagService: DiagnosticsService,
              private httpService: HttpService) {
  }

  ngOnInit() {
    this.createDiagForm = new FormGroup({
      "diag": new FormControl(null),
      "diagName": new FormControl(null),
      "diagPrice": new FormControl(null)
    })

    if(this.config.data){
      let item = this.diagService.diagnostics[this.config.data.index];
      if(this.diagService.role === 'admin'){
        this.createDiagForm.controls['diagName'].setValue(item.serviceName);
      }
      else{
        this.createDiagForm.controls['diagPrice'].setValue(item.price);
      }
    }
  }

  filterDiag(e : any){
    let filtered: any[] = [];
    let query = e.query;

    this.httpService.getRequestWithParams(`${this.diagService.adminUrl}/search`, {query: query}).subscribe(
      (response:any) => this.filteredDiags = response
    )
  }

  onSubmit(){
    if(this.diagService.editMode){
      this.diagService.updateValue(this.config.data.index, this.createDiagForm.value)
    }
    else{
      if(this.diagService.role === 'admin'){
        this.diagService.selectedDiags.push({serviceName: this.createDiagForm.value.diagName})
        this.diagService.appendValue();
      }
      else{
        this.diagService.selectedDiags.push(
          {
            serviceName: this.createDiagForm.value.diag.serviceName,
            diagnosticId: this.createDiagForm.value.diag.id,
            price: this.createDiagForm.value.diagPrice,
            organizationId: 1
          })
      }
    }
    this.createDiagForm.reset();
  }

  onDelete(index: number){
    this.diagService.selectedDiags.splice(index, 1);
  }

  onConfirm(){
    this.diagService.appendValue();
    this.diagService.selectedDiags = [];
  }
}
