import {Component} from '@angular/core';
import {HttpService} from "@shared/services/http.service";
import {RefreshService} from "@shared/services/refresh.service";
import {ApiPaths} from "@enums/api-paths";
import {AuthService} from "@authentication/auth.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent{

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
      title: "Organizations",
      icon: "home_health",
      count: null,
      url: "/org"
    },
    {
      title: "Employees",
      icon: "admin_panel_settings",
      count: null,
      url: "/users"
    },
    {
      title: "Patients",
      icon: "groups",
      count: null,
      url: "/patients"
    },
  ]

  adminURL = ApiPaths.admin

  constructor(private httpService: HttpService,
              public authService: AuthService) {}

  ngOnInit() {
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

        this.totalRevenue = response.totalRevenue;
      })
  }
}
