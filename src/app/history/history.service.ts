import { Injectable } from '@angular/core';
import {AuthService} from "@authentication/auth.service";
import {HttpService} from "@shared/services/http.service";
import {ApiPaths} from "@enums/api-paths";
import {Params} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  role = this.authService.getRole()
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

  getDiagHistory(params: Params){
    if(this.role === "ROLE_ADMIN"){
      this.httpService.getRequestWithParams(`${this.diagBillURL}/view/all`, params)
        .subscribe(
          (response:any) => {
            this.diagBillHistory = response.content;
            this.totalDiagHistory = response.totalElements;
          })
    } else{
      this.httpService.getRequestWithParams(`${this.diagBillURL}/view/${this.authService.orgID}/all`, params)
        .subscribe(
          (response:any) => {
            this.diagBillHistory = response.content;
            this.totalDiagHistory = response.totalElements;
          })
    }
  }

  getDiagHistoryByID(id: number){
    this.httpService.getRequest(`${this.diagBillURL}/view/${id}`)
      .subscribe((response: any) => {
        this.billingDetails = response
      })
  }

  getMedHistory(params: Params){
    if (this.role === "ROLE_ADMIN"){
      this.httpService.getRequestWithParams(`${this.medBillURL}/all`, params)
        .subscribe(
          (response:any) => {
            this.medBillHistory = response.content;
            this.totalMedHistory = response.totalElements;
          })
    } else{
      this.httpService.getRequestWithParams(`${this.medBillURL}/org/${this.authService.orgID}/search`, params)
        .subscribe(
          (response:any) => {
            this.medBillHistory = response.content;
            this.totalMedHistory = response.totalElements;
          })
    }
  }

  getMedHistoryByID(id: number){
    this.httpService.getRequest(`${this.medBillURL}/get/${id}`)
      .subscribe((response: any) => {
        this.billingDetails = response
      })
  }

  getDocHistory(params: Params){
    if (this.role === "ROLE_ADMIN"){
      this.httpService.getRequestWithParams(`${this.docBillURL}/all`, params)
        .subscribe(
          (response:any) => {
            this.docBillHistory = response.content;
            this.totalDocHistory = response.totalElements;
          })
    } else{
      this.httpService.getRequestWithParams(`${this.docBillURL}/org/${this.authService.orgID}/search`, params)
        .subscribe(
          (response:any) => {
            this.docBillHistory = response.content;
            this.totalDocHistory = response.totalElements;
          })
    }
  }

  getDocHistoryByID(id: number){
    this.httpService.getRequest(`${this.docBillURL}/get/${id}`)
      .subscribe((response: any) => {
        console.log(response)
        this.billingDetails = response
      })
  }
}
