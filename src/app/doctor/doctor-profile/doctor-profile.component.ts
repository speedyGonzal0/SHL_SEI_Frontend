import { Component } from '@angular/core';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent {

  doctor = {
    id: 123,
    name: "Renu Akter",
    phone: "01613887722",
    email: "renu@gmail.com",
    gender: "Female",
    specialities: ["Pediatrics", "Dermatology", "dasdsadsadda"],
    degrees: ["PhD (Glasgow)","FCPS (Glasgow)","MBBS (DMC)"]
  }

  colHeaders = ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"]

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
