import {Injectable} from '@angular/core';
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {ApiPaths} from "@enums/api-paths";
import {HttpService} from "@shared/services/http.service";
import {Params} from "@angular/router";
import {Medicine} from "@models/medicine";
import {AuthService} from "@authentication/auth.service";
import {HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MedicineService{

  medicines!: Medicine[];
  totalMedicine!: number;
  selectedMeds!: Medicine[];

  adminUrl : string = ApiPaths.medicine;
  orgAdminUrl : string = ApiPaths.orgMed;

  medRef!: DynamicDialogRef;
  medBillURL : string = ApiPaths.medBilling

  editMode : boolean = false;
  role = this.authService.getRole();

  constructor(public httpService: HttpService, private authService: AuthService) { }

  toggleEditMode(){
    this.editMode = !this.editMode;
  }

  getData(queryParams: Params){
    if (this.role === 'ROLE_ADMIN'){
      this.httpService.getRequestWithParams(`${this.adminUrl}/search`, queryParams).subscribe(
        (response: any) => {
          this.medicines = response.content;
          this.totalMedicine = response.totalElements;

          // this.medicines.map((med) => {
          //   if(!this.vendors.includes(med.vendor?.toLowerCase())){
          //     this.vendors.push(med.vendor);
          //   }
          // })
        }
      )
    }
    else {
      this.httpService.getRequestWithParams(`${this.orgAdminUrl}/organization/${this.authService.orgID}/search`, queryParams).subscribe(
        (response: any) => {
          this.medicines = response.content;
          this.totalMedicine = response.totalElements;

          // this.medicines.map((med) => {
          //   if(!this.vendors.includes(med.vendor?.toLowerCase())){
          //     this.vendors.push(med.vendor);
          //   }
          // })
        }
      )
    }
  }

  appendValue(body: Medicine){
    if(this.role === 'ROLE_ADMIN'){
     return this.httpService.createRequest(`${this.adminUrl}/add`, body);
    }
    else{
     return this.httpService.createRequest(`${this.orgAdminUrl}/add`, this.selectedMeds);
    }
  }

  updateValue(body: Medicine){
    return this.httpService.updateRequest(`${this.adminUrl}/update`, body);
  }

  deleteValue(index: number){
    this.httpService.deleteRequest(`${this.orgAdminUrl}/delete/${this.medicines[index].id}`).subscribe();
  }

  // onFilter(event: any){
  //   this.medicines = this.medicines.filter( (med) => med.vendor?.toLowerCase() === event.value.toLowerCase())
  // }
}
