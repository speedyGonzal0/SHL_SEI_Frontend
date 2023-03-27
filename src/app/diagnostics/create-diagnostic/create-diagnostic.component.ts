import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {DiagnosticsService} from "@diagnostics/diagnostics.service";

@Component({
  selector: 'app-create-diagnostic',
  templateUrl: './create-diagnostic.component.html',
  styleUrls: ['./create-diagnostic.component.scss']
})
export class CreateDiagnosticComponent implements OnInit{

  createDiagForm !: FormGroup;
  selectedDiag: any;


  constructor(public config: DynamicDialogConfig, public diagService: DiagnosticsService) {
  }

  ngOnInit() {
    this.createDiagForm = new FormGroup({
      "diagName": new FormControl(null, Validators.required),
      "diagPrice": new FormControl(null)
    })

    if(this.config.data){
      let item = this.diagService.orgDiagnostics[this.config.data.index];
      this.createDiagForm.controls['diagName'].setValue(item.name)
      this.createDiagForm.controls['diagPrice'].setValue(item.price)
    }
  }

  onSubmit(){
    if(this.diagService.editMode){
      this.diagService.updateValue(this.config.data.index, this.createDiagForm.value)
    }
    else{
      this.diagService.appendValue(this.createDiagForm.value);
    }
    this.createDiagForm.reset();
  }



}
