import { Injectable } from '@angular/core';
import {AuthService} from "@authentication/auth.service";
import {HttpService} from "@shared/services/http.service";
import {ApiPaths} from "@enums/api-paths";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  billingDetails! : any
  diagBillHistory : any;
  totalDiagHistory! : number
  diagBillURL = ApiPaths.diagBilling
  medBillHistory : any;
  totalMedHistory! : number
  medBillURL = ApiPaths.medBilling
  docBillHistory : any;
  totalDocHistory! : number
  docBillURL = ApiPaths.docBilling
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

  getMedHistory(){
    this.httpService.getRequest(`${this.medBillURL}/get/org/${this.authService.orgID}/all`)
      .subscribe(
        (response:any) => {
          console.log(response.content)
          this.medBillHistory = response.content;
          this.totalMedHistory = response.totalElements;
        })
  }

  getMedHistoryByID(id: number){
    this.httpService.getRequest(`${this.medBillURL}/${id}`)
      .subscribe((response: any) => {
        this.billingDetails = response
        console.log(this.billingDetails)
      })
  }

  getDocHistory(){
    this.httpService.getRequest(`${this.docBillURL}/get/org/${this.authService.orgID}/all`)
      .subscribe(
        (response:any) => {
          this.docBillHistory = response.content;
          this.totalDocHistory = response.totalElements;
        })
  }

  getDocHistoryByID(id: number){
    this.httpService.getRequest(`${this.medBillURL}/${id}`)
      .subscribe((response: any) => {
        this.billingDetails = response
        console.log(this.billingDetails)
      })
  }
}
