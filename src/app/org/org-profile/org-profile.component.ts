import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {OrgService} from "@shared/services/org.service";
import {HttpService} from "@shared/services/http.service";
import {RefreshService} from "@shared/services/refresh.service";
import {ApiPaths} from "@enums/api-paths";

@Component({
  selector: 'app-org-profile',
  templateUrl: './org-profile.component.html',
  styleUrls: ['./org-profile.component.scss']
})
export class OrgProfileComponent implements OnInit{
  orgID = 1
  orgAdminURL = ApiPaths.orgAdmin
  cardInfo = [
    {
      title: "Doctors",
      icon: "stethoscope",
      count: 123
    },
    {
      title: "Medicines",
      icon: "pill",
      count: 88
    },
    {
      title: "Diagnostics",
      icon: "ecg",
      count: 500
    },
    {
      title: "Employees",
      icon: "groups",
      count: 33
    },
  ]

  constructor(public orgService: OrgService, private route: ActivatedRoute,
              private httpService: HttpService, private refreshService: RefreshService) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params['id'])
        this.orgService.getOrgByID(params['id'])
      }
    )

    this.refreshService.refreshNeeded$
      .subscribe(() => {
          this.getOrgInfo()
        }
      )
    this.getOrgInfo()
  }

  getOrgInfo(){
    this.httpService.getRequest(`${this.orgAdminURL}/dashboard/${this.orgID}`)
      .subscribe((response: any) => {
        console.log(response)
        this.cardInfo[0].count = response.orgDoctors
        this.cardInfo[1].count = response.orgMedicines
        this.cardInfo[2].count = response.orgDiagnostics
        this.cardInfo[3].count = response.orgEmployees
      })
  }
}
