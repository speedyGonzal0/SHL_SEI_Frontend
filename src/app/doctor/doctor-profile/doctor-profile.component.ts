import {Component, OnInit} from '@angular/core';
import {DoctorService} from "@shared/services/doctor.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit{

  id! : number;

  colHeaders = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]

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

  constructor(public doctorService: DoctorService, private route: ActivatedRoute) {}

  ngOnInit() {
    // this.doctorService.getDoctorByID(this.route.snapshot.params['id'])
    this.route.params.subscribe(
      (params: Params) => {
        this.doctorService.getDoctorByID(params['id'])
      }
    )
  }

}
