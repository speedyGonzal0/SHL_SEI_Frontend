import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {MedicineService} from "@medicine/medicine.service";
import {HttpService} from "@shared/services/http.service";
import {Medicine} from "@models/medicine";

@Component({
  selector: 'app-create-medicine',
  templateUrl: './create-medicine.component.html',
  styleUrls: ['./create-medicine.component.scss']
})
export class CreateMedicineComponent implements OnInit{

  createMedForm !: FormGroup;
  selectedMedForm!: FormGroup;
  filteredMeds !: Medicine[];


  constructor(public config: DynamicDialogConfig,
              public medService: MedicineService,
              private httpService: HttpService) {
  }

  ngOnInit() {
    this.createMedForm = new FormGroup({
      "name": new FormControl(null),
      "price": new FormControl(null),
      "genericName": new FormControl(null),
      "strength": new FormControl(null),
      "vendor": new FormControl(null)
    })

    this.selectedMedForm = new FormGroup({
      "med": new FormControl(null)
    })

    this.medService.selectedMeds = [];

    if(this.config.data){
      let item = this.medService.medicines[this.config.data.index];
      this.createMedForm.setValue({
        name: item.name,
        price: item.price,
        genericName: item.genericName,
        strength: item.strength,
        vendor: item.vendor
      })
    }
  }

  filterMeds(e : any){
    let query = e.query;

    this.httpService.getRequestWithParams(`${this.medService.adminUrl}/search`, {query: query}).subscribe(
      (response:any) => this.filteredMeds = response.content
    )
  }

  onSubmit(){
    if(this.medService.editMode){
      this.medService.updateValue(this.config.data.index, this.createMedForm.value)
    }
    else{
      this.medService.appendValue(this.createMedForm.value);
    }
    this.createMedForm.reset();
  }

  onOrgAdminSubmit(){
    this.medService.selectedMeds.push(
      {
        name: this.selectedMedForm.value.med.name,
        organizationId: 1,
        price: this.selectedMedForm.value.med.price,
        medicineId: this.selectedMedForm.value.med.id
      }
    )
    this.selectedMedForm.reset();
  }

  onDelete(index: number){
    this.medService.selectedMeds.splice(index, 1);
  }

  onConfirm(){
    this.medService.appendValue({});
    this.medService.selectedMeds = [];
  }
}
