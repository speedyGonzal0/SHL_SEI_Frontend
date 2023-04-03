import { Injectable } from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {HttpService} from "@shared/services/http.service";

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  orgRef! : DynamicDialogRef
  editMode : boolean = false;

  orgs : {
    id: number,
    name: string,
    email: string,
    phone: string,
    address: string,
    website: string,
  }[] = [];

  org = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
    website: ''
  }

  constructor(private httpService: HttpService) {}

  toggleEditMode(){
    this.editMode = !this.editMode;
  }

  createOrg(orgInfo: any){
    console.log(orgInfo)
    this.httpService.createRequest(
      "http://localhost:9000/organization/admin/1/add",{
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

  editOrg(id:number, orgInfo: any){
    this.httpService.updateRequest(`http://localhost:9000/organization/update/${id}`,orgInfo)
      .subscribe(Response => {
        console.log(Response);
      })
    this.orgRef.close()
  }

  deleteOrg(id: number){
    this.httpService.deleteRequest(`http://localhost:9000/organization/delete/${id}`)
      .subscribe(Response => {
        console.log(Response);
      })
  }

  getOrgByID(id: number){
    this.httpService.getRequest(`http://localhost:9000/organization/${id}`)
      .subscribe((response: any) => {
        this.org = response
        console.log(this.org)
      })
  }
}
