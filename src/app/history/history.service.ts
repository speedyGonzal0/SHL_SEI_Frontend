import { Injectable } from '@angular/core';
import {AuthService} from "@authentication/auth.service";
import {HttpService} from "@shared/services/http.service";
import {ApiPaths} from "@enums/api-paths";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  diagBillHistory : any;
  totalDiagHistory! : number
  billingDetails! : any
  diagBillURL = ApiPaths.diagBilling
  constructor(private authService: AuthService,
              private httpService: HttpService) { }

  getDiagHistory(){
    this.httpService.getRequest(`${this.diagBillURL}/view/${this.authService.orgID}/all`)
      .subscribe(
        (response:any) => {
          this.diagBillHistory = response.content;
          this.totalDiagHistory = response.totalElements;
        })
  }

  getDiagHistoryByID(id: number){
    this.httpService.getRequest(`${this.diagBillURL}/view/${id}`)
      .subscribe((response: any) => {
        this.billingDetails = response
      })
  }
}
