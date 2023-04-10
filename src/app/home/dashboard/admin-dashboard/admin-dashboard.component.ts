import {Component} from '@angular/core';
import {OrgService} from "@shared/services/org.service";
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "@shared/services/http.service";
import {RefreshService} from "@shared/services/refresh.service";
import {ApiPaths} from "@enums/api-paths";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent{

  cardInfo = [
    {
      title: "Diagnostics",
      icon: "ecg",
      count: 500
    },
    {
      title: "Medicines",
      icon: "pill",
      count: 88
    },
    {
      title: "Doctors",
      icon: "stethoscope",
      count: 123
    },
    {
      title: "Organizations",
      icon: "home_health",
      count: 300
    },
    {
      title: "Org Admins",
      icon: "admin_panel_settings",
      count: 25
    },
    {
      title: "Employees",
      icon: "groups",
      count: 33
    },
  ]

  adminURL = ApiPaths.admin


  constructor(private httpService: HttpService, private refreshService: RefreshService) {}

  ngOnInit() {
    this.refreshService.refreshNeeded$
      .subscribe(() => {
          this.getAdminInfo()
        }
      )
    this.getAdminInfo()
  }

  getAdminInfo(){
    this.httpService.getRequest(`${this.adminURL}/dashboard`)
      .subscribe((response: any) => {
        this.cardInfo[0].count = response.diagnostics
        this.cardInfo[1].count = response.medicines
        this.cardInfo[2].count = response.doctors
        this.cardInfo[3].count = response.organizations
        this.cardInfo[4].count = response.diagnostics
        this.cardInfo[5].count = response.employees
      })
  }

}
