import {Injectable} from '@angular/core';
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {ApiPaths} from "@enums/api-paths";
import {HttpService} from "@shared/services/http.service";
import {Params} from "@angular/router";
import {Medicine} from "@models/medicine";
import {AuthService} from "@authentication/auth.service";

@Injectable({
  providedIn: 'root'
})
export class MedicineService{

  medicines!: Medicine[];
  totalMedicine!: number;
  selectedMeds!: Medicine[];

  adminUrl : string = ApiPaths.medicine;
  orgAdminUrl : string = ApiPaths.orgMed;

  ref!: DynamicDialogRef;

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
          // console.log(response);
        }
      )
    }
    else {
      this.httpService.getRequestWithParams(`${this.orgAdminUrl}/organization/1/search`, queryParams).subscribe(
        (response: any) => {
          this.medicines = response.content;
          this.totalMedicine = response.totalElements;
        }
      )
    }
  }

  appendValue(body: Medicine){
    if(this.role === 'ROLE_ADMIN'){
      this.httpService.createRequest(`${this.adminUrl}/add`, body).subscribe();
    }
    else{
      this.httpService.createRequest(`${this.orgAdminUrl}/add`, this.selectedMeds).subscribe();
    }

    this.ref.close();
  }

  updateValue(index: number, value: ɵTypedOrUntyped<any, ɵFormGroupValue<any>, any>){
    // this.diagnostics[index].price = value.diagPrice;
    let item = this.medicines[index];
    let body = {
      "id": item.id,
      ...value
    };
    this.httpService.updateRequest(`${this.adminUrl}/update`, body).subscribe();
    this.ref.close();
  }

  deleteValue(index: number){
    this.httpService.deleteRequest(`${this.orgAdminUrl}/delete/${this.medicines[index].id}`).subscribe();
  }
}
