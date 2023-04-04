import {Component} from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent{

  count = {
    doc : 123,
    diag: 88,
    med: 500,
    employee: 300,
    org: 25,
    orgAdmin: 33
  }

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

}
