import {Component} from '@angular/core';
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
      count: null
    },
    {
      title: "Medicines",
      icon: "pill",
      count: null
    },
    {
      title: "Doctors",
      icon: "stethoscope",
      count: null
    },
    {
      title: "Organizations",
      icon: "home_health",
      count: null
    },
    {
      title: "Employees",
      icon: "admin_panel_settings",
      count: null
    },
    {
      title: "Patients",
      icon: "groups",
      count: null
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
        this.cardInfo[4].count = response.employees
        this.cardInfo[5].count = response.patients
      })
  }
}
