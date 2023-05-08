import { Component } from '@angular/core';
import {ApiPaths} from "@enums/api-paths";
import {HttpService} from "@shared/services/http.service";
import {RefreshService} from "@shared/services/refresh.service";
import {AuthService} from "@authentication/auth.service";

@Component({
  selector: 'app-org-admin-dashboard',
  templateUrl: './org-admin-dashboard.component.html',
  styleUrls: ['./org-admin-dashboard.component.scss']
})
export class OrgAdminDashboardComponent {
  totalRevenue!: number;
  cardInfo = [
    {
      title: "Diagnostics",
      icon: "ecg",
      count: null,
      url: "/diagnostics"
    },
    {
      title: "Medicines",
      icon: "pill",
      count: null,
      url: "/medicine"
    },
    {
      title: "Doctors",
      icon: "stethoscope",
      count: null,
      url: "/doctor"
    },
    {
      title: "Employees",
      icon: "admin_panel_settings",
      count: null,
      url: "/users"
    }
  ]
  orgAdminURL = ApiPaths.orgAdmin

  constructor(private httpService: HttpService, private refreshService: RefreshService, public authService: AuthService) {}

  ngOnInit() {
    // this.refreshService.refreshNeeded$
    //   .subscribe(() => {
    //       this.getAdminInfo()
    //     }
    //   )
    this.getAdminInfo()
  }

  getAdminInfo(){
    this.httpService.getRequest(`${this.orgAdminURL}/dashboard/${this.authService.orgID}`)
      .subscribe((response: any) => {
        this.cardInfo[0].count = response.orgDiagnostics
        this.cardInfo[1].count = response.orgMedicines
        this.cardInfo[2].count = response.orgDoctors
        this.cardInfo[3].count = response.orgEmployees

        this.totalRevenue = response.orgRevenue;

        console.log(response)
      })
  }
}
