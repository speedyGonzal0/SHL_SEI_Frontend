import { Component } from '@angular/core';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent {

  orgs : any = [
    {
    name: "Popular Hospital",
    days: ['0','1','0','1','1','0','0'],
    fees: [1000, 650, 500],
    },
    {
      name: "Apollo Hospital",
      days: ['0','1','0','0','0','0','1'],
      fees: [1200, 600, 800]
    },
  ]
}
