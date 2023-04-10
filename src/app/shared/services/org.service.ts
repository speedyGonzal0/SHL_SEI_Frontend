import { Injectable } from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {HttpService} from "@shared/services/http.service";
import {ApiPaths} from "@enums/api-paths";
import {Params} from "@angular/router";
import {Organization} from "@models/organization";

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
    console.log(orgInfo)
    this.httpService.createRequest(
      `${this.orgURL}/add`,{
        name: orgInfo.name,
        phone: orgInfo.phone,
        email: orgInfo.email,
        address: orgInfo.address,
        website: orgInfo.website,
      })
      .subscribe((response: any) => {
        console.log(response)
      })
    this.orgRef.close()
  }


  getOrg(queryParams: Params){
      this.httpService.getRequestWithParams(`${this.orgURL}/search`, queryParams).subscribe(
        (response: any) => {
          this.orgs = response.content;
          this.totalOrgs = response.totalElement;
          console.log(response.totalElement)
        }
      )
  }

  editOrg(id:number, orgInfo: any){
    this.httpService.updateRequest(`${this.orgURL}/update/${id}`,orgInfo)
      .subscribe(Response => {
        console.log(Response);
      })
    this.orgRef.close()
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
        console.log(this.org)
      })
  }
}
