import {Injectable} from '@angular/core';
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {ApiPaths} from "@enums/api-paths";
import {HttpService} from "@shared/services/http.service";
import {Params} from "@angular/router";
import {Diagnostic} from "@models/diagnostic";
import {AuthService} from "@authentication/auth.service";
import {HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DiagnosticsService{

  diagnostics!: Diagnostic[];
  totalDiagnostics!: number;

  diagBillHistory!: any;
  totalDiagHistory!: number;
  selectedDiags!: Diagnostic[];
  diagHTTPResponse!: HttpResponse<any> | null;

  adminUrl : string = ApiPaths.diagnostic;
  orgAdminUrl : string = ApiPaths.orgDiag;

  diagBillURL : string = ApiPaths.diagBilling;

  diagRef!: DynamicDialogRef;

  editMode : boolean = false;
  role = this.authService.getRole();

  constructor(public httpService: HttpService, private authService: AuthService) { }

  toggleEditMode(){
    this.editMode = !this.editMode;
  }

  getData(queryParams: Params){
    if (this.role === 'ROLE_ADMIN'){
      this.httpService.getRequestWithParams(`${this.adminUrl}/search`, queryParams)
        .subscribe(
        (response: any) => {
          this.diagnostics = response.content;
          this.totalDiagnostics = response.totalElements;
          // console.log(response);
        }
      )
    }
    else {
      this.httpService.getRequestWithParams(`${this.orgAdminUrl}/organization/${this.authService.orgID}/search`, queryParams).subscribe(
        (response: any) => {
          this.diagnostics = response.content;
          this.totalDiagnostics = response.totalElements;
        }
      )
    }
  }

  appendValue(diagInfo: Diagnostic){
    if(this.role === 'ROLE_ADMIN'){
      return this.httpService.createRequest(`${this.adminUrl}/add`, diagInfo);
    }
    else{
      return this.httpService.createRequest(`${this.orgAdminUrl}/add`, this.selectedDiags);
    }
  }

  updateValue(body: Diagnostic){
    if(this.role === 'ROLE_ADMIN'){
     return this.httpService.updateRequest(`${this.adminUrl}/update`, body);
    }
    else{
     return this.httpService.updateRequest(`${this.orgAdminUrl}/update`, body);
    }
  }

  deleteValue(index: number){
    if(this.role === 'ROLE_ADMIN'){
      this.httpService.deleteRequest(`${this.adminUrl}/delete/${this.diagnostics[index].id}`).subscribe();
    }
    else{
      this.httpService.deleteRequest(`${this.orgAdminUrl}/delete/${this.diagnostics[index].id}`).subscribe();
    }
  }

  // searchValue(queryParams: Params){
  //   if (this.role === 'ROLE_ADMIN'){
  //     this.httpService.getRequest(`${this.adminUrl}/search`, queryParams).subscribe(
  //       (response: any) => {
  //         this.diagnostics = response;
  //         console.log("Search called");
  //       }
  //     )
  //   }
  //   else {
  //     this.httpService.getRequest(`${this.orgAdminUrl}/search`, queryParams).subscribe(
  //       (response: any) => {
  //         this.diagnostics = response;
  //       }
  //     )
  //   }
  // }

}
