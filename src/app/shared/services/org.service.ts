import { Injectable } from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {HttpService} from "@shared/services/http.service";
import {ApiPaths} from "@enums/api-paths";
import {Params} from "@angular/router";
import {Organization} from "@models/organization";
import {HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  orgRef! : DynamicDialogRef
  editMode : boolean = false;

  orgs! : Organization[];

  totalOrgs! : number;

  org = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
    website: ''
  }

  orgURL = ApiPaths.org

  constructor(private httpService: HttpService) {}

  toggleEditMode(){
    this.editMode = !this.editMode;
  }

  createOrg(orgInfo: any){
   return this.httpService.createRequest(`${this.orgURL}/add`,orgInfo)
  }


  getOrg(queryParams: Params){
      this.httpService.getRequestWithParams(`${this.orgURL}/search`, queryParams).subscribe(
        (response: any) => {
          this.orgs = response.content;
          this.totalOrgs = response.totalElements;
        }
      )
  }

  editOrg(id:number, orgInfo: any){
    return this.httpService.updateRequest(`${this.orgURL}/update/${id}`,orgInfo)
  }

  deleteOrg(id: number){
    this.httpService.deleteRequest(`${this.orgURL}/delete/${id}`)
      .subscribe(Response => {
        console.log(Response);
      })
  }

  getOrgByID(id: number){
    this.httpService.getRequest(`${this.orgURL}/${id}`)
      .subscribe((response: any) => {
        this.org = response
      })
  }
}
