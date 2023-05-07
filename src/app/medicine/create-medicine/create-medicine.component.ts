import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {MedicineService} from "@medicine/medicine.service";
import {HttpService} from "@shared/services/http.service";
import {Medicine} from "@models/medicine";
import {AuthService} from "@authentication/auth.service";
import {NotificationService} from "@shared/components/notification/notification.service";
import {RefreshService} from "@shared/services/refresh.service";

@Component({
  selector: 'app-create-medicine',
  templateUrl: './create-medicine.component.html',
  styleUrls: ['./create-medicine.component.scss'],
  providers: []

})
export class CreateMedicineComponent implements OnInit{

  createMedForm !: FormGroup;
  selectedMedForm!: FormGroup;
  filteredMeds !: Medicine[];


  constructor(public config: DynamicDialogConfig,
              public medService: MedicineService,
              private httpService: HttpService,
              private authService: AuthService,
              private refreshService: RefreshService,
              private notificationService: NotificationService
              ) {
  }

  ngOnInit() {
    this.createMedForm = new FormGroup({
      "name": new FormControl(null, Validators.required),
      "price": new FormControl(null, Validators.required),
      "genericName": new FormControl(null, Validators.required),
      "strength": new FormControl(null, Validators.required),
      "formulation": new FormControl(null, Validators.required),
      "vendor": new FormControl(null, Validators.required)
    })

    this.selectedMedForm = new FormGroup({
      "med": new FormControl(null, Validators.required)
    })

    this.medService.selectedMeds = [];

    if(this.config.data){
      let item = this.medService.medicines[this.config.data.index];
      this.createMedForm.setValue({
        name: item.name,
        price: item.price,
        genericName: item.genericName,
        strength: item.strength,
        formulation: item.formulation,
        vendor: item.vendor
      })
    }
  }

  filterMeds(e : any){
    let query = e.query;

    this.httpService.getRequestWithParams(`${this.medService.adminUrl}/get/all/${this.authService.orgID}`, {query: query}).subscribe(
      (response:any) => this.filteredMeds = response.content
    )
  }

  onSubmit(){
    if(this.medService.editMode){
      this.updateMedicine()
    }
    else{
      this.createMedicine();
    }
  }

  updateMedicine(){
    let item = this.medService.medicines[this.config.data.index];
    let body = {"id": item.id, ...this.createMedForm.value};
    this.medService.updateValue(body).subscribe({
      next: response => {
        this.notificationService.sendSuccessMessage("Edit Successful!")
        this.createMedForm.reset();
        this.refreshService.updateMedTable();
        this.medService.medRef.close();
      },
      error: err => {
        this.notificationService.sendErrorMessage(`${err.error.message}`);
      }
    });
  }

  createMedicine(){
    this.medService.appendValue(this.createMedForm.value).subscribe({
      next: response => {
        this.notificationService.sendSuccessMessage("Created Successfully!")
        this.createMedForm.reset();
        this.refreshService.updateMedTable();
        this.medService.medRef.close();
      },
      error: err => {
        this.notificationService.sendErrorMessage(`${err.error.message}`);
      }
    })
  }

  onOrgAdminSubmit(){
    this.medService.selectedMeds.push(
      {
        name: this.selectedMedForm.value.med.name,
        organizationId: this.authService.orgID,
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
    this.medService.appendValue({}).subscribe({
      next: response => {
        this.notificationService.sendSuccessMessage("Created Successfully!")
        this.medService.selectedMeds = [];
        this.refreshService.updateMedTable();
        this.medService.medRef.close();
      },
      error: err => {
        this.notificationService.sendErrorMessage(`${err.error.message}` );
      }
    });
  }
}
