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
      title: "Employees",
      icon: "admin_panel_settings",
      count: null
    }
  ]
  orgAdminURL = ApiPaths.orgAdmin

  constructor(private httpService: HttpService, private refreshService: RefreshService, private authService: AuthService) {}

  ngOnInit() {
    this.refreshService.refreshNeeded$
      .subscribe(() => {
          this.getAdminInfo()
        }
      )
    this.getAdminInfo()
  }

  getAdminInfo(){
    this.httpService.getRequest(`${this.orgAdminURL}/dashboard/${this.authService.orgID}`)
      .subscribe((response: any) => {
        this.cardInfo[0].count = response.orgDiagnostics
        this.cardInfo[1].count = response.orgMedicines
        this.cardInfo[2].count = response.orgDoctors
        this.cardInfo[3].count = response.orgEmployees
      })
  }
}
